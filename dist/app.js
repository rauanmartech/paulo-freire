(() => {
  const questions = window.QUESTOES || [];
  const byNumber = new Map(questions.map(question => [question.number, question]));
  const storageKey = 'paulo-freire-enem-2025-matematica-caderno-5';
  const letters = ['A', 'B', 'C', 'D', 'E'];
  const saved = (() => { try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch { return {}; } })();
  let progress = saved && typeof saved === 'object' ? saved : {};
  let current = Number(location.hash.match(/^#q-(\d{3})$/)?.[1]) || 136;
  if (!byNumber.has(current)) current = 136;
  let filter = 'all';

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
    const query = $('search').value.trim().toLocaleLowerCase('pt-BR');
    return !query || String(question.number).includes(query) || question.snippet.toLocaleLowerCase('pt-BR').includes(query);
  }

  function renderGrid() {
    const grid = $('question-grid');
    grid.replaceChildren();
    const visible = questions.filter(matchesFilter);
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
      if (question.number === current) button.setAttribute('aria-current', 'true');
      button.addEventListener('click', () => selectQuestion(question.number, true));
      grid.append(button);
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

  function renderQuestion() {
    const question = byNumber.get(current);
    const state = stateFor(current);
    const result = resultFor(question);
    $('question-count').textContent = `QUESTÃO ${current - 135} DE 45`;
    $('question-page').textContent = `Página ${question.page} do caderno`;
    $('question-title').textContent = `Questão ${current}`;
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

  $('search').addEventListener('input', renderGrid);
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
