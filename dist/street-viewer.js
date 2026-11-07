(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const block = 54;
  const gap = 12;
  const pitch = block + gap;
  const origin = { x: 70, y: 70 };
  const corner = (column, row) => ({ x: origin.x + column * pitch, y: origin.y + row * pitch });
  const points = [
    { x: corner(4, 6).x + block, y: corner(4, 6).y },
    corner(4, 6),
    corner(4, 5),
    corner(4, 4),
    corner(4, 3),
    corner(3, 3),
    corner(2, 3)
  ];
  const messages = [
    'Saída: João está no canto nordeste (em cima e à direita) do quarteirão P.',
    'Caminhe para oeste pelo quarteirão de João. Virando à direita, a nova direção é norte.',
    'Norte: passou pelo 1º quarteirão.',
    'Norte: passou pelo 2º quarteirão.',
    'Norte: passou pelo 3º quarteirão. Virando à esquerda, a nova direção é oeste.',
    'Oeste: passou pelo 1º quarteirão.',
    'Oeste: chegou ao 2º quarteirão, no canto da casa A. A partida foi em P.'
  ];
  const colors = { west: '#F06423', north: '#147BDE' };
  let activeSvg = null;
  let activeObserver = null;
  function updateViewport() {
    if (activeSvg?.isConnected) activeSvg.setAttribute('viewBox', window.innerWidth <= 600 ? '0 0 520 620' : '0 0 860 620');
  }
  window.addEventListener('resize', updateViewport);

  function element(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text) item.textContent = text;
    return item;
  }
  function svgElement(tag, attributes = {}, text) {
    const item = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attributes)) item.setAttribute(key, value);
    if (text) item.textContent = text;
    return item;
  }
  const label = (x, y, value, attributes = {}) => svgElement('text', {
    x, y, 'font-family': 'Arial, sans-serif', ...attributes
  }, value);

  window.createStreetRouteViewer = function createStreetRouteViewer() {
    const figure = element('figure', 'solid-diagram street-interactive');
    const stage = element('div', 'street-stage');
    const svg = svgElement('svg', {
      viewBox: window.innerWidth <= 600 ? '0 0 520 620' : '0 0 860 620', role: 'img',
      'aria-label': 'Mapa animado da questão 160. A rota sai do canto nordeste do quarteirão P, segue para oeste, depois três quarteirões ao norte e dois ao oeste até a casa A.'
    });
    activeSvg = svg;
    svg.append(label(30, 39, 'Siga as ruas até a casa A', { fill: '#24383A', 'font-size': 24, 'font-weight': 700 }));
    svg.append(label(30, 61, 'Cada quadrado cinza é um quarteirão; o ponto laranja é João.', { fill: '#627477', 'font-size': 15 }));

    const candidates = new Map([
      ['0,4', 'Q'], ['3,4', 'S'], ['6,0', 'R'], ['6,4', 'P'], ['6,5', 'T']
    ]);
    for (let row = 0; row < 7; row++) {
      for (let column = 0; column < 6; column++) {
        const x = origin.x + column * pitch, y = origin.y + row * pitch;
        const isStart = row === 6 && column === 4;
        const isFriend = row === 3 && column === 2;
        svg.append(svgElement('rect', {
          x, y, width: block, height: block, rx: 2,
          fill: isStart ? '#FCE3D1' : isFriend ? '#DDECF5' : '#CED2D4',
          stroke: isStart ? '#F06423' : '#637477', 'stroke-width': isStart ? 3 : 1.5
        }));
        const candidate = candidates.get(`${row},${column}`);
        if (candidate) svg.append(label(x + block / 2, y + block / 2 + 6, candidate, {
          'text-anchor': 'middle', fill: '#294344', 'font-size': 21, 'font-weight': 700
        }));
        if (isFriend) {
          svg.append(svgElement('rect', { x, y, width: 22, height: 22, fill: '#233C40' }));
          svg.append(label(x + 11, y + 16, 'A', { 'text-anchor': 'middle', fill: '#FFFFFF', 'font-size': 16, 'font-weight': 700 }));
        }
      }
    }

    svg.append(svgElement('polyline', {
      points: points.map(point => `${point.x},${point.y}`).join(' '),
      fill: 'none', stroke: '#9CB7B6', 'stroke-width': 2, 'stroke-dasharray': '6 7'
    }));
    const trails = points.slice(1).map((point, index) => {
      const from = points[index];
      const line = svgElement('line', {
        x1: from.x, y1: from.y, x2: from.x, y2: from.y,
        stroke: index >= 1 && index <= 3 ? colors.north : colors.west,
        'stroke-width': 6, 'stroke-linecap': 'round'
      });
      svg.append(line);
      return line;
    });
    const friendCorner = points[points.length - 1];
    svg.append(svgElement('circle', {
      cx: friendCorner.x, cy: friendCorner.y, r: 11,
      fill: 'none', stroke: '#147BDE', 'stroke-width': 3
    }));
    const marker = svgElement('circle', {
      cx: points[0].x, cy: points[0].y, r: 8,
      fill: '#F06423', stroke: '#FFFFFF', 'stroke-width': 3
    });
    svg.append(marker);

    svg.append(svgElement('rect', { x: 530, y: 85, width: 290, height: 462, rx: 15, fill: '#FFFFFF', stroke: '#D9E7E3', 'stroke-width': 2 }));
    svg.append(label(551, 110, 'Bússola e movimentos', { fill: '#24383A', 'font-size': 20, 'font-weight': 700 }));
    const compass = { x: 675, y: 209 };
    svg.append(svgElement('circle', { cx: compass.x, cy: compass.y, r: 70, fill: '#F6FAF9', stroke: '#AEC7C3', 'stroke-width': 2 }));
    svg.append(svgElement('path', { d: `M${compass.x} 265 V153 M619 ${compass.y} H731`, fill: 'none', stroke: '#557276', 'stroke-width': 2.5 }));
    svg.append(svgElement('path', { d: 'M675 151 L670 162 L680 162 Z M733 209 L722 204 L722 214 Z', fill: '#557276' }));
    svg.append(svgElement('path', { d: 'M675 209 L724 160', fill: 'none', stroke: '#F06423', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    svg.append(svgElement('path', { d: 'M724 160 L711 164 L720 173 Z', fill: '#F06423' }));
    svg.append(label(671, 136, 'N', { fill: '#294344', 'font-size': 17, 'font-weight': 700 }));
    svg.append(label(672, 291, 'S', { fill: '#294344', 'font-size': 17, 'font-weight': 700 }));
    svg.append(label(598, 215, 'O', { fill: '#294344', 'font-size': 17, 'font-weight': 700 }));
    svg.append(label(747, 215, 'L', { fill: '#294344', 'font-size': 17, 'font-weight': 700 }));
    svg.append(label(724, 150, 'NE', { fill: '#B64F20', 'font-size': 17, 'font-weight': 700 }));
    svg.append(label(552, 317, 'Nordeste = em cima e à direita.', { fill: '#516668', 'font-size': 14 }));
    svg.append(svgElement('path', { d: 'M550 335 H800', stroke: '#D9E7E3', 'stroke-width': 1.5 }));
    svg.append(label(552, 367, '1. Oeste pelo quarteirão P', { fill: colors.west, 'font-size': 16, 'font-weight': 700 }));
    svg.append(label(552, 405, '2. Direita → norte, 3 quarteirões', { fill: colors.north, 'font-size': 16, 'font-weight': 700 }));
    svg.append(label(552, 443, '3. Esquerda → oeste, 2 quarteirões', { fill: colors.west, 'font-size': 16, 'font-weight': 700 }));
    svg.append(svgElement('path', { d: 'M550 465 H800', stroke: '#D9E7E3', 'stroke-width': 1.5 }));
    svg.append(label(552, 497, 'Chegada: canto da casa A', { fill: '#176DA8', 'font-size': 16, 'font-weight': 700 }));
    svg.append(label(30, 591, 'P é a casa de João: a rota começa no canto superior direito desse quarteirão.', {
      fill: '#627477', 'font-size': 14
    }));
    stage.append(svg);

    const readout = element('div', 'street-readout');
    const counter = element('span', 'street-counter');
    const message = element('p', 'street-message');
    message.setAttribute('aria-live', 'polite');
    readout.append(counter, message);
    const controls = element('div', 'street-controls');
    const previous = element('button', 'street-control', '← Passo anterior');
    const play = element('button', 'street-control street-play', 'Reproduzir ▶');
    const next = element('button', 'street-control', 'Próximo passo →');
    const reset = element('button', 'street-control', 'Reiniciar');
    for (const button of [previous, play, next, reset]) button.type = 'button';
    controls.append(previous, play, next, reset);
    const caption = element('figcaption', '', 'A rota acompanha as viradas descritas no enunciado, uma esquina por vez.');
    figure.append(stage, readout, controls, caption);
    activeObserver?.disconnect();
    if (window.ResizeObserver) {
      activeObserver = new ResizeObserver(updateViewport);
      activeObserver.observe(figure);
    }
    requestAnimationFrame(updateViewport);

    let index = 0;
    let playing = false;
    let animating = false;
    let raf = 0;
    let timer = 0;
    let autoStarted = false;

    function render(position = points[index], targetIndex = index) {
      marker.setAttribute('cx', position.x);
      marker.setAttribute('cy', position.y);
      trails.forEach((line, segmentIndex) => {
        const endpoint = segmentIndex < index ? points[segmentIndex + 1]
          : segmentIndex + 1 === targetIndex ? position : points[segmentIndex];
        line.setAttribute('x2', endpoint.x);
        line.setAttribute('y2', endpoint.y);
      });
      counter.textContent = `PASSO ${targetIndex} DE 6`;
      message.textContent = messages[targetIndex];
      previous.disabled = animating || index === 0;
      next.disabled = animating || index === 6;
      play.textContent = playing ? 'Pausar ❚❚' : index === 6 ? 'Reproduzir de novo ▶' : 'Reproduzir ▶';
    }
    function stop() {
      playing = false;
      animating = false;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      render();
    }
    function animateNext() {
      if (!figure.isConnected || index === 6) { stop(); return; }
      animating = true;
      const from = points[index], to = points[index + 1], targetIndex = index + 1;
      let started;
      function frame(timestamp) {
        if (!figure.isConnected) { stop(); return; }
        if (started === undefined) started = timestamp;
        const progress = Math.min(1, (timestamp - started) / 650);
        const smooth = progress * progress * (3 - 2 * progress);
        render({ x: from.x + (to.x - from.x) * smooth, y: from.y + (to.y - from.y) * smooth }, targetIndex);
        if (progress < 1) {
          raf = requestAnimationFrame(frame);
        } else {
          index = targetIndex;
          animating = false;
          if (index === 6) playing = false;
          render();
          if (playing) timer = setTimeout(animateNext, 320);
        }
      }
      raf = requestAnimationFrame(frame);
    }
    function startPlayback() {
      if (playing) { stop(); return; }
      if (index === 6) index = 0;
      playing = true;
      render();
      animateNext();
    }
    previous.addEventListener('click', () => { stop(); index = Math.max(0, index - 1); render(); });
    next.addEventListener('click', () => { stop(); animateNext(); });
    reset.addEventListener('click', () => { stop(); index = 0; render(); });
    play.addEventListener('click', startPlayback);
    render();
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const observer = new IntersectionObserver(entries => {
        if (autoStarted || !entries.some(entry => entry.isIntersecting)) return;
        autoStarted = true;
        observer.disconnect();
        timer = setTimeout(() => { if (figure.isConnected) startPlayback(); }, 500);
      }, { threshold: 0.45 });
      setTimeout(() => observer.observe(figure), 0);
    }
    return figure;
  };
})();
