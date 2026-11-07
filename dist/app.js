(() => {
  const classifications = window.CLASSIFICACOES || {};
  const questions = (window.QUESTOES || []).map(question => ({
    ...question,
    areas: classifications[question.number]?.areas || [],
    tags: classifications[question.number]?.tags || [],
    difficulty: classifications[question.number]?.difficulty || null
  }));
  const resolutions = window.RESOLUCOES || {};
  const byNumber = new Map(questions.map(question => [question.number, question]));
  const storageKey = 'paulo-freire-enem-2025-matematica-caderno-5';
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const difficultyLabels = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' };
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const saved = (() => { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; } })();
  let progress = saved && typeof saved === 'object' ? saved : {};
  let current = Number(location.hash.match(/^#q-(\d{3})$/)?.[1]) || 136;
  if (!byNumber.has(current)) current = 136;
  let filter = 'all';
  let difficultyFilter = '';

  const $ = id => document.getElementById(id);
  const save = () => { try { localStorage.setItem(storageKey, JSON.stringify(progress)); } catch {} };
  const stateFor = number => progress[number] || {};
  const resultFor = question => {
    if (question.annulled) return 'annulled';
    const state = stateFor(question.number);
    if (!state.revealed) return 'pending';
    return state.selection === question.answer ? 'correct' : 'wrong';
  };

  function renderStats() {
    const valid = questions.filter(question => !question.annulled);
    const checked = valid.filter(question => stateFor(question.number).revealed).length;
    const correct = valid.filter(question => resultFor(question) === 'correct').length;
    $('stat-checked').textContent = checked;
    $('stat-correct').textContent = correct;
    $('stat-rate').textContent = checked ? `${Math.round(correct / checked * 100)}% de aproveitamento` : '0% de aproveitamento';
    $('progress-fill').style.width = `${checked / valid.length * 100}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow', checked);
  }

  function matchesFilter(question) {
    const result = resultFor(question);
    if (filter !== 'all' && result !== filter) return false;
    if ($('area-filter').value && !question.areas.includes($('area-filter').value)) return false;
    if (difficultyFilter && question.difficulty !== difficultyFilter) return false;
    const terms = normalize($('search').value.trim()).split(/\s+/).filter(Boolean);
    const searchable = normalize([
      question.number,
      question.snippet,
      ...question.areas,
      ...question.tags,
      difficultyLabels[question.difficulty] || '',
      question.annulled ? 'anulada' : ''
    ].join(' '));
    return terms.every(term => searchable.includes(term));
  }

  function renderGrid() {
    const grid = $('question-grid');
    grid.replaceChildren();
    const visible = questions.filter(matchesFilter);
    $('nav-total').textContent = visible.length === questions.length ? `${questions.length} no total` : `${visible.length} de ${questions.length}`;
    const eligible = visible.filter(question => !question.annulled);
    $('draw-button').disabled = eligible.length === 0;
    $('draw-hint').textContent = eligible.length
      ? `${eligible.length} ${eligible.length === 1 ? 'questão válida' : 'questões válidas'} no filtro atual`
      : 'Nenhuma questão válida neste filtro';
    if (!visible.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-list';
      empty.textContent = 'Nenhuma questão encontrada para este filtro.';
      grid.append(empty);
      return;
    }
    for (const question of visible) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = question.number;
      button.className = `${resultFor(question)}${question.number === current ? ' current' : ''}`;
      button.setAttribute('aria-label', `Questão ${question.number}${question.annulled ? ', anulada' : ''}`);
      button.title = question.areas.join(' · ');
      if (question.number === current) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => selectQuestion(question.number, true));
      grid.append(button);
    }
  }

  function renderQuestionMetadata(question) {
    const container = $('question-meta');
    container.replaceChildren();
    const difficulty = difficultyLabels[question.difficulty];
    if (difficulty) {
      const badge = document.createElement('span');
      badge.className = `difficulty-badge difficulty-${question.difficulty}`;
      badge.textContent = `Dificuldade: ${difficulty}`;
      badge.title = 'Dificuldade sugerida para estudo, não oficial';
      container.append(badge);
    }
    for (const [kind, values] of [['area', question.areas], ['tag', question.tags]]) {
      for (const value of values) {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `topic-chip ${kind}`;
        chip.textContent = value;
        chip.title = `Buscar questões sobre ${value}`;
        chip.setAttribute('aria-label', `Buscar questões com a tag ${value}`);
        chip.addEventListener('click', () => {
          $('search').value = value;
          $('area-filter').value = '';
          difficultyFilter = '';
          updateDifficultyButtons();
          filter = 'all';
          document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === 'all'));
          renderGrid();
          if (window.innerWidth < 761) document.querySelector('.navigator').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        container.append(chip);
      }
    }
  }

  function renderChoices(question, state) {
    const choices = $('choices');
    choices.replaceChildren();
    for (const letter of letters) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = letter;
      button.className = state.selection === letter ? 'selected' : '';
      button.setAttribute('aria-label', `Alternativa ${letter}`);
      button.setAttribute('aria-pressed', state.selection === letter ? 'true' : 'false');
      button.disabled = Boolean(state.revealed);
      button.addEventListener('click', () => {
        progress[question.number] = { ...stateFor(question.number), selection: letter };
        save();
        renderQuestion();
      });
      choices.append(button);
    }
  }

  function renderFeedback(question, state) {
    const feedback = $('feedback');
    feedback.hidden = !state.revealed;
    feedback.className = 'feedback';
    feedback.replaceChildren();
    if (!state.revealed) return;
    const title = document.createElement('strong');
    const detail = document.createElement('span');
    if (question.annulled) {
      feedback.classList.add('annulled');
      title.textContent = 'Questão anulada';
      detail.textContent = 'O gabarito do caderno 5 indica esta questão como anulada. Ela não entra no cálculo de acertos ou erros.';
    } else if (state.selection === question.answer) {
      feedback.classList.add('correct');
      title.textContent = 'Você acertou!';
      detail.textContent = `Sua resposta foi ${state.selection}. O gabarito é ${question.answer}.`;
    } else {
      feedback.classList.add('wrong');
      title.textContent = 'Você errou desta vez.';
      detail.textContent = `Sua resposta foi ${state.selection}. O gabarito é ${question.answer}.`;
    }
    feedback.append(title, detail);
  }

  function renderResolution(question, state) {
    const container = $('resolution');
    const resolution = resolutions[question.number];
    container.replaceChildren();
    container.hidden = !state.revealed || !resolution;
    if (container.hidden) return;

    const kicker = document.createElement('span');
    kicker.className = 'section-kicker';
    kicker.textContent = 'RESOLUÇÃO COMENTADA';
    const heading = document.createElement('h3');
    heading.id = 'resolution-title';
    heading.textContent = resolution.title;
    const intro = document.createElement('p');
    intro.className = 'resolution-intro';
    intro.textContent = resolution.intro;
    const list = document.createElement('ol');
    list.className = 'resolution-steps';

    let diagramFigure;
    if (resolution.diagram) {
      if (resolution.diagram.interactiveStreet && window.createStreetRouteViewer) {
        diagramFigure = window.createStreetRouteViewer();
      } else if (resolution.diagram.interactiveCupola && window.createPentagonalCupolaViewer) {
        diagramFigure = window.createPentagonalCupolaViewer();
      } else if (resolution.diagram.interactiveGrid && window.createGridMotionViewer) {
        diagramFigure = window.createGridMotionViewer();
      } else if (resolution.diagram.interactive && window.createHexSolidViewer) {
        diagramFigure = window.createHexSolidViewer(resolution.diagram);
      } else {
        diagramFigure = document.createElement('figure');
        diagramFigure.className = 'solid-diagram';
        const diagramImage = document.createElement('img');
        diagramImage.src = resolution.diagram.src;
        diagramImage.alt = resolution.diagram.alt;
        diagramFigure.append(diagramImage);
        if (resolution.diagram.caption) {
          const caption = document.createElement('figcaption');
          caption.textContent = resolution.diagram.caption;
          diagramFigure.append(caption);
        }
      }
    }

    resolution.steps.forEach((step, index) => {
      const item = document.createElement('li');
      const number = document.createElement('span');
      number.className = 'step-number';
      number.textContent = index + 1;
      const content = document.createElement('div');
      content.className = 'step-content';
      const title = document.createElement('h4');
      title.textContent = step.title;
      const explanation = document.createElement('p');
      explanation.textContent = step.explanation;
      content.append(title, explanation);
      if (step.diagram) {
        const figure = document.createElement('figure');
        figure.className = 'solid-diagram';
        const image = document.createElement('img');
        image.src = step.diagram.src;
        image.alt = step.diagram.alt;
        figure.append(image);
        content.append(figure);
      }
      if (step.orderedValues) {
        const ordered = document.createElement('div');
        ordered.className = 'ordered-values';
        ordered.setAttribute('aria-label', 'Valores em ordem crescente; o quinto e o sexto são os valores centrais');
        step.orderedValues.forEach((value, position) => {
          const cell = document.createElement('span');
          if (position === 4 || position === 5) cell.className = 'middle';
          const label = document.createElement('small');
          label.textContent = `${position + 1}º`;
          const number = document.createElement('strong');
          number.textContent = value;
          cell.append(label, number);
          ordered.append(cell);
        });
        content.append(ordered);
      }
      if (step.table) {
        const table = document.createElement('table');
        table.className = 'proportion-table';
        if (step.table.kind === 'cost') table.classList.add('cost-table');
        if (step.table.caption) {
          const caption = document.createElement('caption');
          caption.textContent = step.table.caption;
          table.append(caption);
        }
        const header = document.createElement('tr');
        for (const label of step.table.headers) {
          const cell = document.createElement('th');
          cell.scope = 'col';
          cell.textContent = label;
          header.append(cell);
        }
        table.append(header);
        step.table.rows.forEach((row, rowIndex) => {
          const line = document.createElement('tr');
          if (rowIndex === step.table.highlightRow) line.classList.add('best-row');
          row.forEach((value, cellIndex) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            if (step.table.kind === 'cost') cell.dataset.label = step.table.headers[cellIndex];
            line.append(cell);
          });
          table.append(line);
        });
        content.append(table);
      }
      if (step.proportion) {
        const table = document.createElement('table');
        table.className = 'proportion-table';
        const caption = document.createElement('caption');
        caption.textContent = 'Correspondência na mistura final';
        table.append(caption);
        const header = document.createElement('tr');
        for (const label of ['Substância', 'Porcentagem', 'Volume']) {
          const cell = document.createElement('th');
          cell.scope = 'col';
          cell.textContent = label;
          header.append(cell);
        }
        table.append(header);
        for (const row of step.proportion) {
          const line = document.createElement('tr');
          for (const value of row) {
            const cell = document.createElement('td');
            cell.textContent = value;
            line.append(cell);
          }
          table.append(line);
        }
        content.append(table);
      }
      for (const fraction of step.fractions || []) {
        const line = document.createElement('div');
        line.className = 'equation fraction-equation';
        line.setAttribute('role', 'math');
        line.setAttribute('aria-label', fraction.spoken);
        const stack = document.createElement('span');
        stack.className = 'fraction-stack';
        stack.setAttribute('aria-hidden', 'true');
        const numerator = document.createElement('span');
        numerator.className = 'fraction-numerator';
        numerator.textContent = fraction.numerator;
        const denominator = document.createElement('span');
        denominator.className = 'fraction-denominator';
        denominator.textContent = fraction.denominator;
        stack.append(numerator, denominator);
        const tail = document.createElement('span');
        tail.className = 'fraction-tail';
        tail.setAttribute('aria-hidden', 'true');
        tail.textContent = fraction.tail;
        line.append(stack, tail);
        content.append(line);
      }
      for (const formula of step.equations || (step.equation ? [step.equation] : [])) {
        const equation = document.createElement('div');
        equation.className = 'equation';
        equation.textContent = formula;
        content.append(equation);
      }
      if (step.coverage) {
        const visual = document.createElement('div');
        visual.className = 'coverage-visual';
        visual.setAttribute('aria-label', '200 metros antes do policial e 200 metros depois: 400 metros protegidos');
        const left = document.createElement('span');
        left.textContent = '← 200 m';
        const point = document.createElement('b');
        point.textContent = 'P';
        const right = document.createElement('span');
        right.textContent = '200 m →';
        visual.append(left, point, right);
        content.append(visual);
      }
      item.append(number, content);
      list.append(item);
    });

    const conclusion = document.createElement('div');
    conclusion.className = 'resolution-conclusion';
    const conclusionText = document.createElement('strong');
    conclusionText.textContent = resolution.conclusion;
    const answer = document.createElement('span');
    answer.textContent = resolution.answer;
    conclusion.append(conclusionText, answer);
    container.append(kicker, heading, intro);
    if (diagramFigure) container.append(diagramFigure);
    container.append(list);
    if (resolution.tip) {
      const tip = document.createElement('aside');
      tip.className = 'resolution-tip';
      const tipTitle = document.createElement('strong');
      tipTitle.textContent = resolution.tip.title;
      const tipText = document.createElement('p');
      tipText.textContent = resolution.tip.text;
      const tipEquation = document.createElement('div');
      tipEquation.className = 'tip-equation';
      tipEquation.textContent = resolution.tip.equation;
      tip.append(tipTitle, tipText, tipEquation);
      container.append(tip);
    }
    container.append(conclusion);
  }

  function renderQuestion() {
    const question = byNumber.get(current);
    const state = stateFor(current);
    const result = resultFor(question);
    $('question-count').textContent = `QUESTÃO ${current - 135} DE 45`;
    $('question-page').textContent = `Página ${question.page} do caderno`;
    $('question-title').textContent = `Questão ${current}`;
    renderQuestionMetadata(question);
    const badge = $('status-badge');
    badge.className = `status-badge ${result}`;
    badge.textContent = ({annulled:'Anulada',correct:'Acertou',wrong:'Errou',pending:state.selection?'Resposta marcada':'Não respondida'})[result];
    const img = $('question-image');
    img.src = question.image;
    img.alt = `Enunciado, figuras e alternativas da questão ${current} do ENEM 2025`;
    img.tabIndex = 0;
    renderChoices(question, state);
    const reveal = $('reveal-button');
    reveal.disabled = Boolean(state.revealed) || (!question.annulled && !state.selection);
    reveal.textContent = question.annulled ? 'Ver situação da questão ↗' : 'Ver gabarito ↗';
    reveal.hidden = Boolean(state.revealed);
    $('retry-button').hidden = !state.revealed || question.annulled;
    renderFeedback(question, state);
    renderResolution(question, state);
    $('prev-button').disabled = current === 136;
    $('next-button').disabled = current === 180;
    renderGrid();
    renderStats();
  }

  function selectQuestion(number, scroll) {
    if (!byNumber.has(number)) return;
    current = number;
    history.replaceState(null, '', `#q-${number}`);
    renderQuestion();
    if (scroll && window.innerWidth < 761) $('questao').scrollIntoView({behavior:'smooth',block:'start'});
  }

  const drawOverlay = $('draw-overlay');
  const drawStages = [...drawOverlay.querySelectorAll('[data-draw-stage]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let drawTarget = null;
  let drawTimers = [];
  let drawInterval = null;
  let drawReturnFocus = null;
  const drawSoundKey = 'paulo-freire-sorteio-som';
  let drawSoundEnabled = (() => {
    try { return localStorage.getItem(drawSoundKey) !== 'off'; } catch { return true; }
  })();
  let drawAudioContext = null;

  function updateDrawSoundButton() {
    const button = $('draw-sound');
    button.textContent = drawSoundEnabled ? 'Som ligado' : 'Som desligado';
    button.setAttribute('aria-pressed', String(drawSoundEnabled));
    button.setAttribute('aria-label', drawSoundEnabled ? 'Desligar som do sorteio' : 'Ligar som do sorteio');
  }

  function prepareDrawAudio() {
    if (!drawSoundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!drawAudioContext) drawAudioContext = new AudioContextClass();
      if (drawAudioContext.state === 'suspended') drawAudioContext.resume().catch(() => {});
    } catch {}
  }

  function playDrawTone(index) {
    if (!drawSoundEnabled || !drawAudioContext || drawAudioContext.state !== 'running') return;
    const tones = index === 2 ? [[659, 0], [880, .11]] : [[index === 0 ? 392 : 523, 0]];
    for (const [frequency, offset] of tones) {
      const oscillator = drawAudioContext.createOscillator();
      const gain = drawAudioContext.createGain();
      const at = drawAudioContext.currentTime + offset;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(.0001, at);
      gain.gain.exponentialRampToValueAtTime(.035, at + .018);
      gain.gain.exponentialRampToValueAtTime(.0001, at + .23);
      oscillator.connect(gain);
      gain.connect(drawAudioContext.destination);
      oscillator.start(at);
      oscillator.stop(at + .24);
    }
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function clearDrawTimers() {
    drawTimers.forEach(clearTimeout);
    drawTimers = [];
    clearInterval(drawInterval);
    drawInterval = null;
  }

  function closeDraw(restoreFocus = true) {
    clearDrawTimers();
    drawOverlay.hidden = true;
    document.body.classList.remove('draw-active');
    if (restoreFocus && drawReturnFocus?.isConnected) drawReturnFocus.focus();
  }

  function scheduleDraw(callback, delay) {
    drawTimers.push(setTimeout(callback, delay));
  }

  function revealDrawStage(index, options) {
    if (drawOverlay.hidden) return;
    const stage = drawStages[index];
    const value = stage.querySelector('strong');
    stage.classList.add('active');
    stage.classList.toggle('rolling', !reducedMotion.matches);
    value.textContent = reducedMotion.matches ? options.final : randomItem(options.pool);
    if (!reducedMotion.matches) {
      drawInterval = setInterval(() => { value.textContent = randomItem(options.pool); }, 80);
    }
    scheduleDraw(() => {
      clearInterval(drawInterval);
      drawInterval = null;
      value.textContent = options.final;
      stage.classList.remove('active', 'rolling');
      stage.classList.add('done');
      playDrawTone(index);
      if (index === 1) stage.classList.add(`difficulty-${drawTarget.difficulty}`);
      $('draw-progress-fill').style.width = `${(index + 1) / 3 * 100}%`;
      $('draw-status').textContent = `${options.label}: ${options.final}`;
      if (index < 2) {
        scheduleDraw(() => revealDrawStage(index + 1, options.next), reducedMotion.matches ? 280 : 510);
      } else {
        $('draw-title').textContent = 'Sua questão foi sorteada!';
        $('draw-description').textContent = 'Agora é sua vez de resolver.';
        $('draw-open').hidden = false;
        $('draw-open').focus();
      }
    }, reducedMotion.matches ? 340 : 850);
  }

  function startDraw() {
    const eligible = questions.filter(question => !question.annulled && matchesFilter(question));
    if (!eligible.length) return;
    drawTarget = randomItem(eligible);
    prepareDrawAudio();
    drawReturnFocus = document.activeElement;
    clearDrawTimers();
    drawStages.forEach(stage => {
      stage.className = 'draw-stage';
      stage.querySelector('strong').textContent = '?';
    });
    $('draw-title').textContent = 'Sorteando sua questão';
    $('draw-description').textContent = 'Acompanhe a revelação: área, dificuldade e questão.';
    $('draw-status').textContent = 'Preparando o sorteio…';
    $('draw-progress-fill').style.width = '0';
    $('draw-open').hidden = true;
    drawOverlay.hidden = false;
    document.body.classList.add('draw-active');
    $('draw-close').focus();
    const area = drawTarget.areas[0] || 'Matemática';
    const difficulty = difficultyLabels[drawTarget.difficulty] || 'Não classificada';
    const number = String(drawTarget.number);
    const numberOptions = eligible.map(question => String(question.number));
    const third = { label: 'Questão', final: number, pool: numberOptions };
    const second = { label: 'Dificuldade', final: difficulty, pool: Object.values(difficultyLabels), next: third };
    const first = { label: 'Área', final: area, pool: [...new Set(eligible.flatMap(question => question.areas))], next: second };
    scheduleDraw(() => revealDrawStage(0, first), reducedMotion.matches ? 100 : 300);
  }

  $('draw-button').addEventListener('click', startDraw);
  $('draw-sound').addEventListener('click', () => {
    drawSoundEnabled = !drawSoundEnabled;
    try { localStorage.setItem(drawSoundKey, drawSoundEnabled ? 'on' : 'off'); } catch {}
    updateDrawSoundButton();
    if (drawSoundEnabled) { prepareDrawAudio(); playDrawTone(0); }
  });
  updateDrawSoundButton();
  $('draw-close').addEventListener('click', () => closeDraw());
  $('draw-open').addEventListener('click', () => {
    const number = drawTarget.number;
    closeDraw(false);
    selectQuestion(number, false);
    $('questao').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    $('question-title').tabIndex = -1;
    $('question-title').focus({ preventScroll: true });
  });
  drawOverlay.addEventListener('click', event => { if (event.target === drawOverlay) closeDraw(); });
  drawOverlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeDraw(); }
    if (event.key !== 'Tab') return;
    const focusables = [$('draw-sound'), $('draw-close'), ...($('draw-open').hidden ? [] : [$('draw-open')])];
    const index = focusables.indexOf(document.activeElement);
    event.preventDefault();
    focusables[(index + (event.shiftKey ? focusables.length - 1 : 1)) % focusables.length].focus();
  });

  for (const area of [...new Set(questions.flatMap(question => question.areas))].sort((a, b) => a.localeCompare(b, 'pt-BR'))) {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    $('area-filter').append(option);
  }
  $('search').addEventListener('input', renderGrid);
  $('area-filter').addEventListener('change', renderGrid);
  function updateDifficultyButtons() {
    document.querySelectorAll('[data-difficulty]').forEach(button => {
      const active = button.dataset.difficulty === difficultyFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  document.querySelectorAll('[data-difficulty]').forEach(button => button.addEventListener('click', () => {
    difficultyFilter = button.dataset.difficulty;
    updateDifficultyButtons();
    renderGrid();
  }));
  updateDifficultyButtons();
  $('clear-taxonomy').addEventListener('click', () => {
    $('search').value = '';
    $('area-filter').value = '';
    difficultyFilter = '';
    updateDifficultyButtons();
    filter = 'all';
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item.dataset.filter === 'all'));
    renderGrid();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    renderGrid();
  }));
  $('reveal-button').addEventListener('click', () => {
    const question = byNumber.get(current);
    const state = stateFor(current);
    if (!question.annulled && !state.selection) return;
    progress[current] = { ...state, revealed: true };
    save();
    renderQuestion();
    $('feedback').scrollIntoView({behavior:'smooth',block:'nearest'});
  });
  $('retry-button').addEventListener('click', () => { delete progress[current]; save(); renderQuestion(); });
  $('prev-button').addEventListener('click', () => selectQuestion(current - 1, false));
  $('next-button').addEventListener('click', () => selectQuestion(current + 1, false));
  $('reset-progress').addEventListener('click', () => {
    if (!confirm('Apagar todas as respostas e recomeçar seu progresso?')) return;
    progress = {};
    save();
    renderQuestion();
  });
  window.addEventListener('hashchange', () => {
    const number = Number(location.hash.match(/^#q-(\d{3})$/)?.[1]);
    if (byNumber.has(number)) { current = number; renderQuestion(); }
  });
  const modal = $('image-modal');
  const openModal = () => { $('modal-image').src = byNumber.get(current).image; $('modal-image').alt = `Questão ${current} ampliada`; modal.hidden = false; $('close-modal').focus(); };
  const closeModal = () => { modal.hidden = true; $('question-image').focus(); };
  $('question-image').addEventListener('click', openModal);
  $('question-image').addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(); } });
  $('close-modal').addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
  renderQuestion();
})();
