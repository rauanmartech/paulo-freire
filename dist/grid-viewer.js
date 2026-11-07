(() => {
  const start = { x: 5, y: 1, z: 6 };
  const path = [{ ...start, phase: 'start' }];
  let position = { ...start };
  for (let count = 0; count < 3; count++) { position = { ...position, x: position.x - 1 }; path.push({ ...position, phase: 'x' }); }
  for (let count = 0; count < 5; count++) { position = { ...position, y: position.y + 1 }; path.push({ ...position, phase: 'y' }); }
  for (let count = 0; count < 4; count++) { position = { ...position, z: position.z - 1 }; path.push({ ...position, phase: 'z' }); }

  const phaseColors = { x: '#EF3B39', y: '#18A558', z: '#147BDE' };
  const planeColors = { xy: '#E9F6F1', xz: '#FFF1E8', yz: '#EDF3FF' };

  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  window.createGridMotionViewer = function createGridMotionViewer() {
    const figure = node('figure', 'solid-diagram grid-interactive');
    const stage = node('div', 'grid-stage');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 590;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Modelo 3D com os planos xy, xz e yz, três eixos, cubo azul e suas projeções laranja. Arraste para girar a visualização.');
    canvas.textContent = 'Modelo tridimensional dos eixos, planos e deslocamentos da questão 144.';
    const dragHint = node('span', 'grid-drag-hint', 'Arraste para girar ↔');
    const viewReset = node('button', 'grid-view-reset', 'Voltar visão');
    viewReset.type = 'button';
    stage.append(canvas, dragHint, viewReset);

    const readout = node('div', 'grid-readout');
    const stepCount = node('span', 'grid-step-count');
    const coordinates = node('strong', 'grid-coordinates');
    const message = node('p', 'grid-message');
    readout.append(stepCount, coordinates, message);

    const phaseRow = node('div', 'grid-phases');
    const phaseItems = [
      ['x', '1. Plano yz', 'x diminui 3 casas'],
      ['y', '2. Plano xz', 'y aumenta 5 casas'],
      ['z', '3. Plano xy', 'z diminui 4 casas']
    ].map(([key, title, detail]) => {
      const item = node('div', 'grid-phase');
      item.dataset.phase = key;
      const dot = node('span', 'grid-phase-dot');
      dot.style.backgroundColor = phaseColors[key];
      const copy = node('span');
      copy.append(node('strong', '', title), node('small', '', detail));
      item.append(dot, copy);
      phaseRow.append(item);
      return item;
    });

    const controls = node('div', 'grid-controls');
    const previous = node('button', 'grid-control', '← Casa anterior');
    const play = node('button', 'grid-control grid-play', 'Reproduzir ▶');
    const next = node('button', 'grid-control', 'Próxima casa →');
    const reset = node('button', 'grid-control', 'Reiniciar percurso');
    for (const button of [previous, play, next, reset]) button.type = 'button';
    controls.append(previous, play, next, reset);

    const caption = node('figcaption');
    caption.textContent = 'O cubo percorre 12 casas no total: 3 em x, 5 em y e 4 em z. As marcas laranja são suas projeções nos três planos.';
    figure.append(stage, readout, phaseRow, controls, caption);

    const context = canvas.getContext('2d');
    let yaw = Math.PI / 4;
    let elevation = 0.42;
    let stepIndex = 0;
    let timer;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function basis() {
      const c = Math.cos(yaw), s = Math.sin(yaw), ce = Math.cos(elevation), se = Math.sin(elevation);
      return {
        right: { x: -s, y: c, z: 0 },
        up: { x: -se * c, y: -se * s, z: ce },
        toward: { x: ce * c, y: ce * s, z: se }
      };
    }
    const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
    const center = { x: 4, y: 4, z: 4 };
    function project(point, camera) {
      const relative = { x: point.x - center.x, y: point.y - center.y, z: point.z - center.z };
      return { x: 400 + 36 * dot(relative, camera.right), y: 295 - 36 * dot(relative, camera.up) };
    }
    function polygon(points, fill, stroke, lineWidth, camera) {
      context.beginPath();
      points.map(point => project(point, camera)).forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y); else context.lineTo(point.x, point.y);
      });
      context.closePath();
      context.fillStyle = fill;
      context.fill();
      if (stroke) { context.strokeStyle = stroke; context.lineWidth = lineWidth; context.stroke(); }
    }
    function line(from, to, color, width, camera, dash = []) {
      const a = project(from, camera), b = project(to, camera);
      context.beginPath();
      context.setLineDash(dash);
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.strokeStyle = color;
      context.lineWidth = width;
      context.stroke();
      context.setLineDash([]);
    }
    function label(text, point, camera, color = '#294344') {
      const projected = project(point, camera);
      context.font = 'bold 17px Arial, sans-serif';
      context.fillStyle = '#FFFFFF';
      context.fillText(text, projected.x + 7, projected.y - 6);
      context.fillStyle = color;
      context.fillText(text, projected.x + 6, projected.y - 7);
    }
    function drawPlane(name, camera) {
      const points = name === 'xy'
        ? [{ x: 0, y: 0, z: 0 }, { x: 8, y: 0, z: 0 }, { x: 8, y: 8, z: 0 }, { x: 0, y: 8, z: 0 }]
        : name === 'xz'
          ? [{ x: 0, y: 0, z: 0 }, { x: 8, y: 0, z: 0 }, { x: 8, y: 0, z: 8 }, { x: 0, y: 0, z: 8 }]
          : [{ x: 0, y: 0, z: 0 }, { x: 0, y: 8, z: 0 }, { x: 0, y: 8, z: 8 }, { x: 0, y: 0, z: 8 }];
      polygon(points, planeColors[name], '#CDDAD9', 1.5, camera);
      for (let unit = 1; unit < 8; unit++) {
        if (name === 'xy') {
          line({ x: unit, y: 0, z: 0 }, { x: unit, y: 8, z: 0 }, '#CCD8D8', 1, camera);
          line({ x: 0, y: unit, z: 0 }, { x: 8, y: unit, z: 0 }, '#CCD8D8', 1, camera);
        } else if (name === 'xz') {
          line({ x: unit, y: 0, z: 0 }, { x: unit, y: 0, z: 8 }, '#CCD8D8', 1, camera);
          line({ x: 0, y: 0, z: unit }, { x: 8, y: 0, z: unit }, '#CCD8D8', 1, camera);
        } else {
          line({ x: 0, y: unit, z: 0 }, { x: 0, y: unit, z: 8 }, '#CCD8D8', 1, camera);
          line({ x: 0, y: 0, z: unit }, { x: 0, y: 8, z: unit }, '#CCD8D8', 1, camera);
        }
      }
    }
    function drawAxes(camera) {
      const origin = { x: 0, y: 0, z: 0 };
      const axes = [
        ['x', { x: 8.7, y: 0, z: 0 }, phaseColors.x],
        ['y', { x: 0, y: 8.7, z: 0 }, phaseColors.y],
        ['z', { x: 0, y: 0, z: 8.7 }, phaseColors.z]
      ];
      for (const [name, endpoint, color] of axes) {
        line(origin, endpoint, color, 3.5, camera);
        const end = project(endpoint, camera);
        const before = project({ x: endpoint.x * 0.94, y: endpoint.y * 0.94, z: endpoint.z * 0.94 }, camera);
        const angle = Math.atan2(end.y - before.y, end.x - before.x);
        context.beginPath();
        context.moveTo(end.x, end.y);
        context.lineTo(end.x - 12 * Math.cos(angle - 0.5), end.y - 12 * Math.sin(angle - 0.5));
        context.lineTo(end.x - 12 * Math.cos(angle + 0.5), end.y - 12 * Math.sin(angle + 0.5));
        context.closePath();
        context.fillStyle = color;
        context.fill();
        label(name, endpoint, camera, color);
      }
      label('xy', { x: 7.6, y: 7.6, z: 0 }, camera);
      label('xz', { x: 7.6, y: 0, z: 7.6 }, camera);
      label('yz', { x: 0, y: 7.6, z: 7.6 }, camera);
    }
    function drawProjection(current, camera) {
      const x = current.x, y = current.y, z = current.z;
      const squares = [
        [{ x, y, z: 0 }, { x: x + 1, y, z: 0 }, { x: x + 1, y: y + 1, z: 0 }, { x, y: y + 1, z: 0 }],
        [{ x, y: 0, z }, { x: x + 1, y: 0, z }, { x: x + 1, y: 0, z: z + 1 }, { x, y: 0, z: z + 1 }],
        [{ x: 0, y, z }, { x: 0, y: y + 1, z }, { x: 0, y: y + 1, z: z + 1 }, { x: 0, y, z: z + 1 }]
      ];
      const centerCube = { x: x + 0.5, y: y + 0.5, z: z + 0.5 };
      const centers = [
        { x: x + 0.5, y: y + 0.5, z: 0 },
        { x: x + 0.5, y: 0, z: z + 0.5 },
        { x: 0, y: y + 0.5, z: z + 0.5 }
      ];
      for (const target of centers) line(centerCube, target, '#748A8D', 1.5, camera, [5, 5]);
      for (const square of squares) polygon(square, '#F25F29CC', '#B6451E', 2, camera);
    }
    function drawTrail(camera) {
      for (let index = 1; index <= stepIndex; index++) {
        const from = path[index - 1], to = path[index];
        line({ x: from.x + 0.5, y: from.y + 0.5, z: from.z + 0.5 },
          { x: to.x + 0.5, y: to.y + 0.5, z: to.z + 0.5 }, phaseColors[to.phase], 5, camera);
      }
    }
    function drawCube(current, camera) {
      const x = current.x, y = current.y, z = current.z;
      const cubeFaces = [
        { normal: { x: -1, y: 0, z: 0 }, color: '#0E5DA8', points: [{ x, y, z }, { x, y: y + 1, z }, { x, y: y + 1, z: z + 1 }, { x, y, z: z + 1 }] },
        { normal: { x: 1, y: 0, z: 0 }, color: '#1976D2', points: [{ x: x + 1, y, z }, { x: x + 1, y: y + 1, z }, { x: x + 1, y: y + 1, z: z + 1 }, { x: x + 1, y, z: z + 1 }] },
        { normal: { x: 0, y: -1, z: 0 }, color: '#155FA8', points: [{ x, y, z }, { x: x + 1, y, z }, { x: x + 1, y, z: z + 1 }, { x, y, z: z + 1 }] },
        { normal: { x: 0, y: 1, z: 0 }, color: '#238BE5', points: [{ x, y: y + 1, z }, { x: x + 1, y: y + 1, z }, { x: x + 1, y: y + 1, z: z + 1 }, { x, y: y + 1, z: z + 1 }] },
        { normal: { x: 0, y: 0, z: -1 }, color: '#0F64B9', points: [{ x, y, z }, { x: x + 1, y, z }, { x: x + 1, y: y + 1, z }, { x, y: y + 1, z }] },
        { normal: { x: 0, y: 0, z: 1 }, color: '#63B5FF', points: [{ x, y, z: z + 1 }, { x: x + 1, y, z: z + 1 }, { x: x + 1, y: y + 1, z: z + 1 }, { x, y: y + 1, z: z + 1 }] }
      ];
      const visible = cubeFaces.filter(face => dot(face.normal, camera.toward) > 0.001)
        .sort((a, b) => dot(a.points[0], camera.toward) - dot(b.points[0], camera.toward));
      for (const face of visible) polygon(face.points, face.color, '#143E65', 2.5, camera);
    }
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const camera = basis();
      for (const plane of ['xy', 'xz', 'yz']) drawPlane(plane, camera);
      drawAxes(camera);
      drawProjection(path[stepIndex], camera);
      drawTrail(camera);
      drawCube(path[stepIndex], camera);
    }
    function pause() {
      if (timer) clearInterval(timer);
      timer = undefined;
    }
    function update() {
      const current = path[stepIndex];
      stepCount.textContent = `CASA ${stepIndex} DE 12`;
      coordinates.textContent = `Posição do cubo: (${current.x}, ${current.y}, ${current.z})`;
      if (stepIndex === 0) message.textContent = 'Posição inicial. Comece pela aproximação ao plano yz.';
      else if (stepIndex <= 3) message.textContent = `Plano yz: x diminui uma casa por vez (${stepIndex}/3).`;
      else if (stepIndex <= 8) message.textContent = `Plano xz: y aumenta uma casa por vez (${stepIndex - 3}/5).`;
      else if (stepIndex < 12) message.textContent = `Plano xy: z diminui uma casa por vez (${stepIndex - 8}/4).`;
      else message.textContent = 'Posição final: (2, 6, 2). Observe as três projeções: alternativa E.';
      phaseItems.forEach((item, index) => {
        const bounds = [[1, 3], [4, 8], [9, 12]][index];
        item.classList.toggle('active', stepIndex >= bounds[0] && stepIndex <= bounds[1]);
        item.classList.toggle('complete', stepIndex > bounds[1]);
      });
      previous.disabled = stepIndex === 0;
      next.disabled = stepIndex === 12;
      play.textContent = timer ? 'Pausar ❚❚' : stepIndex === 12 ? 'Reproduzir de novo ▶' : 'Reproduzir ▶';
      draw();
    }
    previous.addEventListener('click', () => { pause(); stepIndex = Math.max(0, stepIndex - 1); update(); });
    next.addEventListener('click', () => { pause(); stepIndex = Math.min(12, stepIndex + 1); update(); });
    reset.addEventListener('click', () => { pause(); stepIndex = 0; update(); });
    play.addEventListener('click', () => {
      if (timer) { pause(); update(); return; }
      if (stepIndex === 12) stepIndex = 0;
      timer = setInterval(() => {
        if (!figure.isConnected) { pause(); return; }
        stepIndex++;
        if (stepIndex >= 12) { stepIndex = 12; pause(); }
        update();
      }, 650);
      update();
    });
    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      yaw -= (event.clientX - lastX) * 0.008;
      elevation = Math.max(-1.25, Math.min(1.25, elevation - (event.clientY - lastY) * 0.008));
      lastX = event.clientX;
      lastY = event.clientY;
      draw();
    });
    const finishDrag = () => { dragging = false; };
    canvas.addEventListener('pointerup', finishDrag);
    canvas.addEventListener('pointercancel', finishDrag);
    canvas.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') { yaw = Math.PI / 4; elevation = 0.42; }
      if (event.key === 'ArrowLeft') yaw -= 0.16;
      if (event.key === 'ArrowRight') yaw += 0.16;
      if (event.key === 'ArrowUp') elevation = Math.min(1.25, elevation + 0.16);
      if (event.key === 'ArrowDown') elevation = Math.max(-1.25, elevation - 0.16);
      draw();
    });
    viewReset.addEventListener('click', () => { yaw = Math.PI / 4; elevation = 0.42; draw(); canvas.focus(); });
    update();
    return figure;
  };
})();
