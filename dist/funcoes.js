(() => {
  'use strict';

  const param = (key, label, min, max, step, value) => ({ key, label, min, max, step, value });
  const number = value => {
    const rounded = Math.abs(value) < 0.0005 ? 0 : value;
    return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 3 }).format(rounded);
  };
  const signed = value => value < 0 ? `− ${number(-value)}` : `+ ${number(value)}`;
  const shifted = value => value === 0 ? 'x' : value > 0 ? `(x − ${number(value)})` : `(x + ${number(-value)})`;
  const fact = (label, value) => ({ label, value });
  const roots = (a, b, c) => {
    if (Math.abs(a) < 1e-9) return Math.abs(b) < 1e-9 ? Math.abs(c) < 1e-9 ? 'Todos os x' : 'Nenhuma raiz real' : `x = ${number(-c / b)}`;
    const delta = b * b - 4 * a * c;
    if (delta < -1e-9) return 'Nenhuma raiz real';
    if (Math.abs(delta) < 1e-9) return `x = ${number(-b / (2 * a))}`;
    return `x = ${number((-b - Math.sqrt(delta)) / (2 * a))} e ${number((-b + Math.sqrt(delta)) / (2 * a))}`;
  };

  const models = [
    {
      id: 'afim', label: 'Afim', family: 'FUNÇÃO POLINOMIAL', summary: 'Uma reta: a muda a inclinação; b desloca a reta para cima ou para baixo.',
      params: [param('a', 'a · inclinação', -5, 5, 0.1, 1), param('b', 'b · altura inicial', -8, 8, 0.1, 1)],
      evaluate: (p, x) => p.a * x + p.b,
      equation: p => `f(x) = ${number(p.a)}x ${signed(p.b)}`,
      explain: p => `Ao caminhar 1 unidade para a direita, a reta ${p.a > 0 ? `sobe ${number(p.a)}` : p.a < 0 ? `desce ${number(-p.a)}` : 'não sobe nem desce'} unidade(s). O valor b indica onde ela cruza o eixo vertical.`,
      facts: p => [fact('Comportamento', p.a > 0 ? 'Crescente' : p.a < 0 ? 'Decrescente' : 'Constante'), fact('Interseção com y', `(0; ${number(p.b)})`), fact('Zero da função', p.a === 0 ? p.b === 0 ? 'Todos os x' : 'Não existe' : `x = ${number(-p.b / p.a)}`), fact('Domínio', 'Todos os números reais')]
    },
    {
      id: 'quadratica', label: '2º grau', family: 'FUNÇÃO POLINOMIAL', summary: 'Uma parábola: a decide a abertura; b e c alteram sua posição.',
      params: [param('a', 'a · abertura', -3, 3, 0.1, 1), param('b', 'b · inclinação', -8, 8, 0.1, 0), param('c', 'c · altura inicial', -8, 8, 0.1, -4)],
      evaluate: (p, x) => p.a * x * x + p.b * x + p.c,
      equation: p => `f(x) = ${number(p.a)}x² ${signed(p.b)}x ${signed(p.c)}`,
      explain: p => p.a === 0 ? 'Com a = 0, o termo x² desaparece: o desenho vira uma reta (ou uma constante). Experimente afastar a de zero.' : `Como a é ${p.a > 0 ? 'positivo' : 'negativo'}, a parábola abre para ${p.a > 0 ? 'cima' : 'baixo'}. O vértice é seu ponto mais ${p.a > 0 ? 'baixo' : 'alto'}.`,
      facts: p => [fact('Abertura', p.a === 0 ? 'Não há parábola' : p.a > 0 ? 'Para cima' : 'Para baixo'), fact('Vértice', p.a === 0 ? 'Não definido' : `(${number(-p.b / (2 * p.a))}; ${number(p.c - p.b * p.b / (4 * p.a))})`), fact('Raízes reais', roots(p.a, p.b, p.c)), fact('Interseção com y', `(0; ${number(p.c)})`)]
    },
    {
      id: 'cubica', label: '3º grau', family: 'FUNÇÃO POLINOMIAL', summary: 'Uma curva que pode mudar de direção até duas vezes.',
      params: [param('a', 'a · termo cúbico', -2, 2, 0.1, 0.25), param('b', 'b · termo quadrático', -3, 3, 0.1, 0), param('c', 'c · termo linear', -6, 6, 0.1, -2), param('d', 'd · altura inicial', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * x ** 3 + p.b * x ** 2 + p.c * x + p.d,
      equation: p => `f(x) = ${number(p.a)}x³ ${signed(p.b)}x² ${signed(p.c)}x ${signed(p.d)}`,
      explain: () => 'O termo x³ domina quando x se afasta da origem. Alterar b e c muda as curvas e possíveis viradas; d move a interseção com o eixo y.',
      facts: p => [fact('Grau', p.a !== 0 ? '3º grau' : p.b !== 0 ? '2º grau' : p.c !== 0 ? '1º grau' : 'Constante'), fact('Interseção com y', `(0; ${number(p.d)})`), fact('Domínio', 'Todos os números reais'), fact('Extremos', p.a !== 0 ? 'Até duas viradas' : 'Depende do grau atual')]
    },
    {
      id: 'modulo', label: 'Módulo', family: 'FUNÇÃO MODULAR', summary: 'Um V: o vértice marca a mudança de direção.',
      params: [param('a', 'a · abertura', -5, 5, 0.1, 1), param('h', 'h · posição horizontal', -6, 6, 0.1, 0), param('k', 'k · posição vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * Math.abs(x - p.h) + p.k,
      equation: p => `f(x) = ${number(p.a)}|${shifted(p.h)}| ${signed(p.k)}`,
      explain: p => `O módulo transforma distâncias em valores não negativos. O vértice está em (${number(p.h)}; ${number(p.k)}); ${p.a < 0 ? 'o V fica invertido' : p.a === 0 ? 'o gráfico fica horizontal' : 'o V aponta para cima'}.`,
      facts: p => [fact('Vértice', `(${number(p.h)}; ${number(p.k)})`), fact('Abertura', p.a > 0 ? 'Para cima' : p.a < 0 ? 'Para baixo' : 'Reta horizontal'), fact('Domínio', 'Todos os números reais'), fact('Eixo de simetria', `x = ${number(p.h)}`)]
    },
    {
      id: 'raiz', label: 'Raiz quadrada', family: 'FUNÇÃO RADICAL', summary: 'A curva começa em um ponto e segue apenas para um lado.',
      params: [param('a', 'a · orientação', -5, 5, 0.1, 2), param('h', 'h · início horizontal', -6, 6, 0.1, 0), param('k', 'k · início vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => x < p.h ? NaN : p.a * Math.sqrt(x - p.h) + p.k,
      equation: p => `f(x) = ${number(p.a)}√${shifted(p.h)} ${signed(p.k)}`,
      explain: p => `A raiz quadrada real exige ${shifted(p.h)} ≥ 0. Por isso o desenho começa em (${number(p.h)}; ${number(p.k)}) e só existe à direita desse ponto.`,
      facts: p => [fact('Ponto inicial', `(${number(p.h)}; ${number(p.k)})`), fact('Domínio', `x ≥ ${number(p.h)}`), fact('Sentido', p.a > 0 ? 'Sobe' : p.a < 0 ? 'Desce' : 'Constante'), fact('Imagem', p.a > 0 ? `y ≥ ${number(p.k)}` : p.a < 0 ? `y ≤ ${number(p.k)}` : `y = ${number(p.k)}`)]
    },
    {
      id: 'inversa', label: 'Racional', family: 'FUNÇÃO RACIONAL', summary: 'Duas partes que se aproximam das assíntotas sem tocá-las.',
      params: [param('a', 'a · orientação', -8, 8, 0.1, 3), param('h', 'h · assíntota vertical', -6, 6, 0.1, 0), param('k', 'k · assíntota horizontal', -8, 8, 0.1, 0)],
      evaluate: (p, x) => Math.abs(x - p.h) < 1e-8 ? NaN : p.a / (x - p.h) + p.k,
      equation: p => `f(x) = ${number(p.a)}/${shifted(p.h)} ${signed(p.k)}`,
      explain: p => `Em x = ${number(p.h)}, o denominador vale zero: esse x fica fora do domínio. ${p.a === 0 ? 'Com a = 0, o gráfico é horizontal e tem um ponto excluído.' : 'As linhas tracejadas mostram os valores dos quais a curva se aproxima.'}`,
      facts: p => [fact('Domínio', `x ≠ ${number(p.h)}`), fact(p.a === 0 ? 'Ponto excluído' : 'Assíntota vertical', `x = ${number(p.h)}`), fact('Assíntota horizontal', `y = ${number(p.k)}`), fact('Interseção com y', p.h === 0 ? 'Não definida' : `(0; ${number(p.a / -p.h + p.k)})`)]
    },
    {
      id: 'exponencial', label: 'Exponencial', family: 'FUNÇÃO EXPONENCIAL', summary: 'O x aparece no expoente: mudanças iguais em x multiplicam o valor.',
      params: [param('a', 'a · escala', -5, 5, 0.1, 1), param('b', 'b · base', 0.2, 4, 0.1, 2), param('h', 'h · posição horizontal', -5, 5, 0.1, 0), param('k', 'k · posição vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * p.b ** (x - p.h) + p.k,
      equation: p => `f(x) = ${number(p.a)}·${number(p.b)}^(${shifted(p.h)}) ${signed(p.k)}`,
      explain: p => `A cada avanço de 1 em x, a distância até y = ${number(p.k)} é multiplicada por ${number(p.b)}. Como a base é ${p.b > 1 ? 'maior' : 'menor'} que 1, essa distância ${p.b > 1 ? 'cresce' : 'diminui'}; o sinal de a pode espelhar o desenho.`,
      facts: p => [fact('Base', number(p.b)), fact('Comportamento', p.a === 0 ? 'Constante' : (p.a > 0) === (p.b > 1) ? 'Crescente' : 'Decrescente'), fact(p.a === 0 ? 'Linha do gráfico' : 'Assíntota horizontal', `y = ${number(p.k)}`), fact('Domínio', 'Todos os números reais'), fact('Valor em x = h', `f(${number(p.h)}) = ${number(p.a + p.k)}`)]
    },
    {
      id: 'logaritmica', label: 'Logarítmica', family: 'FUNÇÃO LOGARÍTMICA', summary: 'A operação inversa da exponencial; existe somente à direita de h.',
      params: [param('a', 'a · escala', -5, 5, 0.1, 1), param('b', 'b · base', 0.2, 4, 0.1, 2), param('h', 'h · limite do domínio', -6, 6, 0.1, 0), param('k', 'k · posição vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => x <= p.h ? NaN : p.a * Math.log(x - p.h) / Math.log(p.b) + p.k,
      equation: p => `f(x) = ${number(p.a)}·log base ${number(p.b)} ${shifted(p.h)} ${signed(p.k)}`,
      explain: p => `Só existe logaritmo real quando ${shifted(p.h)} > 0. ${p.a === 0 ? 'Com a = 0, o desenho fica horizontal apenas nesse domínio.' : `Perto de x = ${number(p.h)}, a curva se aproxima da linha vertical tracejada.`} A base deve ser positiva e diferente de 1.`,
      facts: p => [fact('Domínio', `x > ${number(p.h)}`), fact('Base', number(p.b)), fact('Comportamento', p.a === 0 ? 'Constante' : (p.a > 0) === (p.b > 1) ? 'Crescente' : 'Decrescente'), fact(p.a === 0 ? 'Limite do domínio' : 'Assíntota vertical', `x = ${number(p.h)}`), fact('Ponto de referência', `(${number(p.h + 1)}; ${number(p.k)})`)]
    },
    {
      id: 'seno', label: 'Seno', family: 'FUNÇÃO TRIGONOMÉTRICA', summary: 'Uma onda periódica que começa na linha média quando h = 0.',
      params: [param('a', 'a · amplitude', -5, 5, 0.1, 2), param('b', 'b · frequência', 0.2, 4, 0.1, 1), param('h', 'h · fase', -6, 6, 0.1, 0), param('k', 'k · linha média', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * Math.sin(p.b * (x - p.h)) + p.k,
      equation: p => `f(x) = ${number(p.a)}sen(${number(p.b)}${shifted(p.h)}) ${signed(p.k)}`,
      explain: p => `A amplitude é |a| = ${number(Math.abs(p.a))}, medida da linha média ao topo. Aumentar b comprime a onda: ela repete o ciclo mais rapidamente.`,
      facts: p => [fact('Amplitude', number(Math.abs(p.a))), fact('Período', p.a === 0 ? 'Sem período fundamental' : `${number(2 * Math.PI / p.b)} ≈ 2π/${number(p.b)}`), fact('Linha média', `y = ${number(p.k)}`), fact('Imagem', `[${number(p.k - Math.abs(p.a))}; ${number(p.k + Math.abs(p.a))}]`)]
    },
    {
      id: 'cosseno', label: 'Cosseno', family: 'FUNÇÃO TRIGONOMÉTRICA', summary: 'Uma onda periódica que começa no topo quando a > 0 e h = 0.',
      params: [param('a', 'a · amplitude', -5, 5, 0.1, 2), param('b', 'b · frequência', 0.2, 4, 0.1, 1), param('h', 'h · fase', -6, 6, 0.1, 0), param('k', 'k · linha média', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * Math.cos(p.b * (x - p.h)) + p.k,
      equation: p => `f(x) = ${number(p.a)}cos(${number(p.b)}${shifted(p.h)}) ${signed(p.k)}`,
      explain: p => `Assim como o seno, o cosseno oscila em torno de y = ${number(p.k)}. Em x = ${number(p.h)}, seu valor é ${number(p.a + p.k)}.`,
      facts: p => [fact('Amplitude', number(Math.abs(p.a))), fact('Período', p.a === 0 ? 'Sem período fundamental' : `${number(2 * Math.PI / p.b)} ≈ 2π/${number(p.b)}`), fact('Linha média', `y = ${number(p.k)}`), fact('Imagem', `[${number(p.k - Math.abs(p.a))}; ${number(p.k + Math.abs(p.a))}]`)]
    },
    {
      id: 'tangente', label: 'Tangente', family: 'FUNÇÃO TRIGONOMÉTRICA', summary: 'Ramos separados por valores em que a tangente não está definida.',
      params: [param('a', 'a · escala', -5, 5, 0.1, 1), param('b', 'b · frequência', 0.2, 4, 0.1, 1), param('h', 'h · fase', -6, 6, 0.1, 0), param('k', 'k · posição vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => Math.abs(Math.cos(p.b * (x - p.h))) < 1e-5 ? NaN : p.a * Math.tan(p.b * (x - p.h)) + p.k,
      equation: p => `f(x) = ${number(p.a)}tg(${number(p.b)}${shifted(p.h)}) ${signed(p.k)}`,
      explain: p => `A tangente repete o desenho a cada π/${number(p.b)} unidade(s). Nos traços verticais, o cosseno vale zero e a divisão que define a tangente não existe.`,
      facts: p => [fact('Período', `${number(Math.PI / p.b)} ≈ π/${number(p.b)}`), fact('Centro do ramo', `(${number(p.h)}; ${number(p.k)})`), fact(p.a === 0 ? 'x indefinido de referência' : 'Assíntota de referência', `x = ${number(p.h + Math.PI / (2 * p.b))}`), fact('Imagem', p.a === 0 ? `y = ${number(p.k)} onde definida` : 'Todos os números reais')]
    },
    {
      id: 'potencia', label: 'Potência', family: 'FUNÇÃO POTÊNCIA', summary: 'Compare potências pares e ímpares mudando o expoente n.',
      params: [param('a', 'a · escala', -3, 3, 0.1, 0.2), param('n', 'n · expoente inteiro', 1, 5, 1, 4), param('b', 'b · posição vertical', -8, 8, 0.1, 0)],
      evaluate: (p, x) => p.a * x ** p.n + p.b,
      equation: p => `f(x) = ${number(p.a)}x^${number(p.n)} ${signed(p.b)}`,
      explain: p => `Expoente ${p.n % 2 === 0 ? 'par: os dois lados têm o mesmo sentido e o gráfico é simétrico em relação ao eixo y' : 'ímpar: os lados seguem sentidos opostos'}. O parâmetro b sobe ou desce a curva inteira.`,
      facts: p => [fact('Expoente', `${number(p.n)} (${p.n % 2 === 0 ? 'par' : 'ímpar'})`), fact('Interseção com y', `(0; ${number(p.b)})`), fact('Domínio', 'Todos os números reais'), fact('Simetria', p.n % 2 === 0 ? 'Em torno do eixo y' : p.b === 0 ? 'Em torno da origem' : `Em torno de (0; ${number(p.b)})`)]
    }
  ];

  const generalForms = {
    afim: 'y = ax + b', quadratica: 'y = ax² + bx + c', cubica: 'y = ax³ + bx² + cx + d',
    modulo: 'y = a|x − h| + k', raiz: 'y = a√(x − h) + k', inversa: 'y = a/(x − h) + k',
    exponencial: 'y = a·b^(x − h) + k', logaritmica: 'y = a·logᵦ(x − h) + k',
    seno: 'y = a·sen(b(x − h)) + k', cosseno: 'y = a·cos(b(x − h)) + k',
    tangente: 'y = a·tg(b(x − h)) + k', potencia: 'y = axⁿ + b'
  };
  const byId = new Map(models.map(model => [model.id, model]));
  const values = new Map(models.map(model => [model.id, Object.fromEntries(model.params.map(p => [p.key, p.value]))]));
  const $ = id => document.getElementById(id);
  const canvas = $('function-graph');
  const ctx = canvas.getContext('2d');
  const view = { cx: 0, cy: 0, scale: 38 };
  let selected = byId.get(location.hash.slice(1)) || models[0];
  let activeParameter = null;
  let hoverX = null;
  let drag = null;
  let frame = 0;

  function setModel(model, updateHash = true) {
    selected = model;
    activeParameter = null;
    $('parameter-popover').hidden = true;
    hoverX = null;
    view.cx = 0; view.cy = 0; view.scale = 38;
    if (updateHash) history.replaceState(null, '', `#${model.id}`);
    for (const button of $('function-list').querySelectorAll('button')) {
      const active = button.dataset.model === model.id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    $('function-family').textContent = model.family;
    $('function-title').textContent = ['2º grau', '3º grau'].includes(model.label) ? `Função do ${model.label}` : `Função ${model.label.toLowerCase()}`;
    $('function-summary').textContent = model.summary;
    $('function-general').textContent = generalForms[model.id];
    $('graph-hint').textContent = ['seno', 'cosseno', 'tangente'].includes(model.id) ? 'x em radianos · arraste para mover · role para ampliar' : 'Arraste para mover · role para ampliar';
    $('control-note').textContent = ['exponencial', 'logaritmica'].includes(model.id) ? 'A base b pode ser menor ou maior que 1, mas não pode ser igual a 1.' : 'Arraste ou digite. O gráfico muda na mesma hora.';
    renderControls();
    updateDetails();
  }

  function renderControls() {
    const container = $('parameter-controls');
    container.replaceChildren();
    const p = values.get(selected.id);
    for (const definition of selected.params) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'parameter-button';
      button.dataset.parameter = definition.key;
      button.setAttribute('aria-controls', 'parameter-popover');
      button.setAttribute('aria-expanded', String(activeParameter === definition.key));
      button.setAttribute('aria-label', `Ajustar ${definition.label}: ${number(p[definition.key])}`);
      const symbol = document.createElement('b'); symbol.textContent = definition.key;
      const value = document.createElement('span'); value.textContent = number(p[definition.key]);
      button.append(symbol, value);
      button.addEventListener('click', () => activeParameter === definition.key ? closeParameter(true) : openParameter(definition.key, true));
      container.append(button);
    }
  }

  function openParameter(key, focusSlider = false) {
    const definition = selected.params.find(item => item.key === key);
    if (!definition) return;
    activeParameter = key;
    const p = values.get(selected.id);
    const slider = $('active-param-slider');
    const input = $('active-param-number');
    $('active-param-title').textContent = definition.label;
    $('active-param-label').textContent = `Valor de ${key}`;
    $('param-min').textContent = number(definition.min);
    $('param-max').textContent = number(definition.max);
    slider.min = definition.min; slider.max = definition.max;
    slider.step = key === 'n' ? 1 : 'any'; slider.value = p[key];
    slider.setAttribute('aria-label', `${definition.label}, de ${number(definition.min)} a ${number(definition.max)}`);
    input.min = definition.min; input.max = definition.max;
    input.step = key === 'n' ? 1 : 'any'; input.value = p[key];
    input.removeAttribute('aria-invalid');
    $('parameter-popover').hidden = false;
    for (const button of $('parameter-controls').querySelectorAll('button')) {
      const active = button.dataset.parameter === key;
      button.classList.toggle('active', active);
      button.setAttribute('aria-expanded', String(active));
    }
    if (focusSlider) slider.focus();
  }

  function closeParameter(restoreFocus = false) {
    const previous = activeParameter;
    activeParameter = null;
    $('parameter-popover').hidden = true;
    for (const button of $('parameter-controls').querySelectorAll('button')) {
      button.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
    }
    if (restoreFocus && previous) $('parameter-controls').querySelector(`[data-parameter="${previous}"]`)?.focus();
  }

  function syncParameterButtons() {
    const p = values.get(selected.id);
    for (const button of $('parameter-controls').querySelectorAll('button')) {
      const key = button.dataset.parameter;
      const definition = selected.params.find(item => item.key === key);
      button.querySelector('span').textContent = number(p[key]);
      button.setAttribute('aria-label', `Ajustar ${definition.label}: ${number(p[key])}`);
    }
  }

  function updateDetails() {
    const p = values.get(selected.id);
    $('function-equation').textContent = selected.equation(p);
    syncParameterButtons();
    $('function-explanation').textContent = selected.explain(p);
    $('graph-legend').textContent = selected.label === '2º grau' ? 'Parábola' : selected.label;
    const container = $('function-facts'); container.replaceChildren();
    for (const item of selected.facts(p)) {
      const node = document.createElement('div'); node.className = 'fact';
      const label = document.createElement('span'); label.textContent = item.label;
      const value = document.createElement('strong'); value.textContent = item.value;
      node.append(label, value); container.append(node);
    }
    updateReadout(); scheduleDraw();
  }

  function getSize() { return { w: canvas.clientWidth, h: canvas.clientHeight }; }
  function screenX(x, w) { return w / 2 + (x - view.cx) * view.scale; }
  function screenY(y, h) { return h / 2 - (y - view.cy) * view.scale; }
  function worldX(px, w) { return view.cx + (px - w / 2) / view.scale; }
  function worldY(py, h) { return view.cy - (py - h / 2) / view.scale; }
  function stepForScale() {
    const raw = 62 / view.scale;
    const power = 10 ** Math.floor(Math.log10(raw));
    return [1, 2, 5, 10].find(multiplier => multiplier * power >= raw) * power;
  }
  function drawGrid(w, h) {
    const step = stepForScale();
    const left = worldX(0, w), right = worldX(w, w), top = worldY(0, h), bottom = worldY(h, h);
    ctx.lineWidth = 1; ctx.strokeStyle = '#e7eeec'; ctx.fillStyle = '#697b7a'; ctx.font = '11px system-ui, sans-serif';
    for (let i = Math.ceil(left / step); i * step <= right && i < 10000; i++) {
      const x = i * step, px = Math.round(screenX(x, w)) + .5;
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
      if (Math.abs(x) > step * .01 && screenY(0, h) > 8 && screenY(0, h) < h - 12) ctx.fillText(number(x), px + 3, Math.min(h - 5, Math.max(13, screenY(0, h) + 15)));
    }
    for (let i = Math.ceil(bottom / step); i * step <= top && i < 10000; i++) {
      const y = i * step, py = Math.round(screenY(y, h)) + .5;
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
      if (Math.abs(y) > step * .01 && screenX(0, w) > 5 && screenX(0, w) < w - 38) ctx.fillText(number(y), Math.min(w - 36, Math.max(5, screenX(0, w) + 6)), py - 4);
    }
    ctx.strokeStyle = '#668d88'; ctx.lineWidth = 1.6;
    const axisX = screenX(0, w), axisY = screenY(0, h);
    ctx.beginPath(); ctx.moveTo(axisX, 0); ctx.lineTo(axisX, h); ctx.moveTo(0, axisY); ctx.lineTo(w, axisY); ctx.stroke();
    ctx.fillStyle = '#247373'; ctx.font = 'bold 12px system-ui, sans-serif';
    if (axisY >= 0 && axisY <= h) ctx.fillText('x', w - 17, Math.max(15, Math.min(h - 5, axisY - 8)));
    if (axisX >= 0 && axisX <= w) ctx.fillText('y', Math.max(6, Math.min(w - 15, axisX + 7)), 16);
  }

  function drawAsymptotes(w, h) {
    const p = values.get(selected.id);
    const vertical = [], horizontal = [];
    if (selected.id === 'inversa') { if (p.a !== 0) vertical.push(p.h); horizontal.push(p.k); }
    if (selected.id === 'logaritmica') vertical.push(p.h);
    if (selected.id === 'exponencial') horizontal.push(p.k);
    if (selected.id === 'tangente' && p.a !== 0) {
      const min = worldX(0, w), max = worldX(w, w);
      const start = Math.ceil(((min - p.h) * p.b - Math.PI / 2) / Math.PI);
      for (let i = start; i < start + 80; i++) {
        const x = p.h + (Math.PI / 2 + i * Math.PI) / p.b;
        if (x > max) break;
        vertical.push(x);
      }
    }
    ctx.save(); ctx.strokeStyle = '#b47b63'; ctx.lineWidth = 1.2; ctx.setLineDash([6, 5]);
    for (const x of vertical) { const px = screenX(x, w); ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke(); }
    for (const y of horizontal) { const py = screenY(y, h); ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke(); }
    ctx.restore();
  }

  function drawCurve(w, h) {
    const p = values.get(selected.id);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = '#F25F29';
    ctx.beginPath(); let previous = null;
    for (let px = 0; px <= w + 2; px += 2) {
      const x = worldX(px, w), y = selected.evaluate(p, x), py = screenY(y, h);
      if (!Number.isFinite(y) || Math.abs(py) > h * 6) { previous = null; continue; }
      const crossesGap = previous && (
        selected.id === 'inversa' && (previous.x - p.h) * (x - p.h) <= 0 ||
        selected.id === 'tangente' && Math.cos(p.b * (previous.x - p.h)) * Math.cos(p.b * (x - p.h)) < 0
      );
      if (!previous || crossesGap || Math.abs(py - previous.py) > h * .8) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      previous = { x, py };
    }
    ctx.stroke();
    if (p.a === 0 && (selected.id === 'inversa' || selected.id === 'tangente')) {
      const excluded = [];
      if (selected.id === 'inversa') excluded.push(p.h);
      else {
        const min = worldX(0, w), max = worldX(w, w);
        const start = Math.ceil(((min - p.h) * p.b - Math.PI / 2) / Math.PI);
        for (let i = start; i < start + 80; i++) {
          const x = p.h + (Math.PI / 2 + i * Math.PI) / p.b;
          if (x > max) break;
          excluded.push(x);
        }
      }
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#F25F29'; ctx.lineWidth = 2;
      for (const x of excluded) {
        ctx.beginPath(); ctx.arc(screenX(x, w), screenY(p.k, h), 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    }
    if (hoverX !== null) {
      const y = selected.evaluate(p, hoverX), px = screenX(hoverX, w), py = screenY(y, h);
      if (Number.isFinite(y) && py >= 0 && py <= h) {
        ctx.strokeStyle = '#247373'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = '#fff'; ctx.strokeStyle = '#F25F29'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
    }
    ctx.restore();
  }

  function draw() {
    frame = 0;
    const { w, h } = getSize(); if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(w * dpr), pixelHeight = Math.round(h * dpr);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) { canvas.width = pixelWidth; canvas.height = pixelHeight; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    drawGrid(w, h); drawAsymptotes(w, h); drawCurve(w, h);
  }
  function scheduleDraw() { if (!frame) frame = requestAnimationFrame(draw); }
  function updateReadout() {
    if (hoverX === null) { $('point-readout').textContent = 'Passe o mouse ou toque no gráfico para ler um ponto.'; return; }
    const y = selected.evaluate(values.get(selected.id), hoverX);
    $('point-readout').textContent = Number.isFinite(y) && Math.abs(y) < 1e6 ? `x = ${number(hoverX)} · f(x) = ${number(y)}` : `x = ${number(hoverX)} · f(x) não definida nesta posição`;
  }
  function zoom(factor, px, py) {
    const { w, h } = getSize();
    px ??= w / 2; py ??= h / 2;
    const anchorX = worldX(px, w), anchorY = worldY(py, h);
    view.scale = Math.max(12, Math.min(220, view.scale * factor));
    view.cx = anchorX - (px - w / 2) / view.scale;
    view.cy = anchorY + (py - h / 2) / view.scale;
    scheduleDraw();
  }
  function pointerPosition(event) { const box = canvas.getBoundingClientRect(); return { x: event.clientX - box.left, y: event.clientY - box.top }; }

  for (const model of models) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'function-option';
    button.dataset.model = model.id; button.textContent = model.label;
    button.addEventListener('click', () => setModel(model));
    $('function-list').append(button);
  }
  $('reset-parameters').addEventListener('click', () => {
    const key = activeParameter;
    values.set(selected.id, Object.fromEntries(selected.params.map(p => [p.key, p.value])));
    renderControls();
    if (key) openParameter(key);
    updateDetails();
  });
  $('close-parameter').addEventListener('click', () => closeParameter(true));
  $('active-param-slider').addEventListener('input', () => {
    if (!activeParameter) return;
    const key = activeParameter, p = values.get(selected.id);
    let next = Number($('active-param-slider').value);
    if (key !== 'n') next = Math.round(next * 100) / 100;
    if (key === 'b' && ['exponencial', 'logaritmica'].includes(selected.id) && next === 1) next = p.b < 1 ? 1.1 : .9;
    p[key] = next;
    $('active-param-slider').value = next;
    $('active-param-number').value = next;
    $('active-param-number').removeAttribute('aria-invalid');
    updateDetails();
  });
  $('active-param-number').addEventListener('input', () => {
    if (!activeParameter) return;
    const key = activeParameter, input = $('active-param-number');
    const definition = selected.params.find(item => item.key === key);
    const next = Number(input.value);
    const forbiddenBase = key === 'b' && ['exponencial', 'logaritmica'].includes(selected.id) && next === 1;
    const valid = input.value !== '' && Number.isFinite(next) && next >= definition.min && next <= definition.max && !forbiddenBase && (key !== 'n' || Number.isInteger(next));
    if (!valid) { input.setAttribute('aria-invalid', 'true'); return; }
    input.removeAttribute('aria-invalid');
    values.get(selected.id)[key] = next;
    $('active-param-slider').value = next;
    updateDetails();
  });
  $('active-param-number').addEventListener('change', () => {
    if (!activeParameter) return;
    $('active-param-number').value = values.get(selected.id)[activeParameter];
    $('active-param-number').removeAttribute('aria-invalid');
  });
  document.addEventListener('pointerdown', event => {
    if (activeParameter && !event.target.closest('#parameter-dock')) closeParameter();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeParameter) { event.preventDefault(); closeParameter(true); }
  });
  $('zoom-in').addEventListener('click', () => zoom(1.25));
  $('zoom-out').addEventListener('click', () => zoom(1 / 1.25));
  $('reset-view').addEventListener('click', () => { view.cx = 0; view.cy = 0; view.scale = 38; scheduleDraw(); });
  canvas.addEventListener('pointerdown', event => {
    const point = pointerPosition(event);
    drag = { id: event.pointerId, x: point.x, y: point.y, cx: view.cx, cy: view.cy };
    hoverX = worldX(point.x, getSize().w); updateReadout(); scheduleDraw();
    canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging');
  });
  canvas.addEventListener('pointermove', event => {
    const point = pointerPosition(event);
    if (drag && drag.id === event.pointerId) {
      view.cx = drag.cx - (point.x - drag.x) / view.scale;
      view.cy = drag.cy + (point.y - drag.y) / view.scale;
    }
    hoverX = worldX(point.x, getSize().w); updateReadout(); scheduleDraw();
  });
  const stopDrag = event => { if (drag?.id === event.pointerId) { drag = null; canvas.classList.remove('dragging'); } };
  canvas.addEventListener('pointerup', stopDrag); canvas.addEventListener('pointercancel', stopDrag);
  canvas.addEventListener('pointerleave', () => { if (!drag) { hoverX = null; updateReadout(); scheduleDraw(); } });
  canvas.addEventListener('wheel', event => { event.preventDefault(); const point = pointerPosition(event); zoom(event.deltaY < 0 ? 1.12 : 1 / 1.12, point.x, point.y); }, { passive: false });
  canvas.addEventListener('keydown', event => {
    const delta = 45 / view.scale;
    if (event.key === 'ArrowLeft') view.cx -= delta;
    else if (event.key === 'ArrowRight') view.cx += delta;
    else if (event.key === 'ArrowUp') view.cy += delta;
    else if (event.key === 'ArrowDown') view.cy -= delta;
    else if (event.key === '+' || event.key === '=') zoom(1.25);
    else if (event.key === '-') zoom(1 / 1.25);
    else if (event.key === '0') { view.cx = 0; view.cy = 0; view.scale = 38; }
    else return;
    event.preventDefault(); scheduleDraw();
  });
  window.addEventListener('hashchange', () => { const model = byId.get(location.hash.slice(1)); if (model && model !== selected) setModel(model, false); });
  if (window.ResizeObserver) new ResizeObserver(scheduleDraw).observe(canvas);
  else window.addEventListener('resize', scheduleDraw);
  setModel(selected, false);
})();
