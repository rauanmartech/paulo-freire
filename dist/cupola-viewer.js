(() => {
  const palette = {
    blue: '#14549E',
    yellow: '#FFD32A',
    green: '#25B74A',
    red: '#ED3039',
    ink: '#173B3E'
  };
  const decagonRadius = 1 / (2 * Math.sin(Math.PI / 10));
  const pentagonRadius = 1 / (2 * Math.sin(Math.PI / 5));
  const antiprismHeight = Math.sqrt(1 - Math.pow(2 * decagonRadius * Math.sin(Math.PI / 20), 2));
  const cupolaHeight = Math.sqrt(1 - Math.pow(decagonRadius - pentagonRadius, 2) -
    2 * decagonRadius * pentagonRadius * (1 - Math.cos(Math.PI / 10)));
  const bottomY = -(antiprismHeight + cupolaHeight) / 2;
  const middleY = bottomY + antiprismHeight;
  const topY = middleY + cupolaHeight;

  const ring = (count, radius, height, offset = 0) => Array.from({ length: count }, (_, index) => {
    const angle = offset + index * Math.PI * 2 / count;
    return { x: radius * Math.cos(angle), y: height, z: radius * Math.sin(angle) };
  });
  const vertices = [
    ...ring(10, decagonRadius, bottomY, Math.PI / 10),
    ...ring(10, decagonRadius, middleY),
    ...ring(5, pentagonRadius, topY, Math.PI / 10)
  ];
  const groups = {
    bottom: Array.from({ length: 10 }, (_, index) => index),
    middle: Array.from({ length: 10 }, (_, index) => index + 10),
    top: Array.from({ length: 5 }, (_, index) => index + 20)
  };
  const faces = [];
  const subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
  const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
  const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
  function addFace(indices, color) {
    const points = indices.map(index => vertices[index]);
    const normal = cross(subtract(points[1], points[0]), subtract(points[2], points[0]));
    const centroid = points.reduce((sum, point) => ({
      x: sum.x + point.x / points.length,
      y: sum.y + point.y / points.length,
      z: sum.z + point.z / points.length
    }), { x: 0, y: 0, z: 0 });
    faces.push({ indices: dot(normal, centroid) < 0 ? [...indices].reverse() : indices, color });
  }

  addFace(groups.bottom, palette.red);
  for (let index = 0; index < 10; index++) {
    const next = (index + 1) % 10;
    addFace([10 + index, index, 10 + next], palette.blue);
    addFace([10 + next, index, next], palette.blue);
  }
  for (let index = 0; index < 5; index++) {
    const a = 10 + 2 * index;
    const b = 10 + (2 * index + 1) % 10;
    const c = 10 + (2 * index + 2) % 10;
    const top = 20 + index;
    const nextTop = 20 + (index + 1) % 5;
    addFace([a, b, top], palette.blue);
    addFace([b, c, nextTop, top], palette.yellow);
  }
  addFace(groups.top, palette.green);

  function element(tag, className, text) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text) item.textContent = text;
    return item;
  }

  window.createPentagonalCupolaViewer = function createPentagonalCupolaViewer() {
    const figure = element('figure', 'solid-diagram cupola-interactive');
    const stage = element('div', 'cupola-stage');
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 560;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Modelo 3D giratório da cúpula pentagonal giralongada: base decagonal vermelha, triângulos azuis, quadrados amarelos e topo pentagonal verde. Arraste para girar ou use as setas do teclado.');
    canvas.textContent = 'Modelo 3D da cúpula pentagonal giralongada, com 25 vértices.';
    const hint = element('span', 'cupola-hint', 'Arraste para girar ↔');
    stage.append(canvas, hint);

    const views = element('div', 'cupola-views');
    const topView = element('button', 'cupola-view-button', 'Ver topo');
    const bottomView = element('button', 'cupola-view-button', 'Ver base');
    const resetView = element('button', 'cupola-view-button', 'Voltar visão');
    for (const button of [topView, bottomView, resetView]) button.type = 'button';
    views.append(topView, bottomView, resetView);

    const selector = element('div', 'cupola-groups');
    selector.setAttribute('role', 'group');
    selector.setAttribute('aria-label', 'Destacar grupos de vértices');
    const choices = [
      ['all', 'Todos', '25 vértices', palette.ink],
      ['bottom', 'Base vermelha', '10 vértices', palette.red],
      ['middle', 'Junção central', '10 vértices', palette.blue],
      ['top', 'Topo verde', '5 vértices', palette.green]
    ];
    const buttons = new Map();
    for (const [key, label, count, color] of choices) {
      const button = element('button', 'cupola-group');
      button.type = 'button';
      button.dataset.group = key;
      button.setAttribute('aria-pressed', key === 'all' ? 'true' : 'false');
      const swatch = element('span', 'cupola-swatch');
      swatch.style.backgroundColor = color;
      const copy = element('span');
      copy.append(element('strong', '', label), element('small', '', count));
      button.append(swatch, copy);
      selector.append(button);
      buttons.set(key, button);
    }
    const readout = element('p', 'cupola-readout', 'Conte por camadas: 10 na base + 10 na junção central + 5 no topo = 25 vértices.');
    readout.setAttribute('aria-live', 'polite');
    const caption = element('figcaption', '', 'As cores seguem a figura do caderno. Gire a peça para observar os vértices que ficam atrás.');
    figure.append(stage, views, selector, readout, caption);

    const context = canvas.getContext('2d');
    let yaw = -0.32;
    let pitch = 0.5;
    let selected = 'all';
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function rotate(point) {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x = point.x * cy - point.z * sy;
      const z = point.x * sy + point.z * cy;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      return { x, y: point.y * cp - z * sp, z: point.y * sp + z * cp };
    }
    function project(point) {
      const factor = 6.2 / (6.2 - point.z);
      return { x: 400 + point.x * 145 * factor, y: 280 - point.y * 145 * factor };
    }
    function drawMarker(point, index, emphasized) {
      const position = project(point);
      context.beginPath();
      context.arc(position.x, position.y, emphasized ? 7 : 4, 0, Math.PI * 2);
      context.fillStyle = '#FFFFFF';
      context.fill();
      context.strokeStyle = emphasized ? '#113B3C' : '#48706F';
      context.lineWidth = emphasized ? 2.5 : 1.6;
      context.stroke();
      if (!emphasized || selected === 'all') return;
      const number = selected === 'bottom' ? index + 1 : selected === 'middle' ? index - 9 : index - 19;
      context.font = 'bold 14px Arial, sans-serif';
      context.lineWidth = 4;
      context.strokeStyle = '#FFFFFF';
      context.strokeText(String(number), position.x + 10, position.y - 9);
      context.fillStyle = palette.ink;
      context.fillText(String(number), position.x + 10, position.y - 9);
    }
    function rayHitsTriangle(origin, direction, a, b, c) {
      const edge1 = subtract(b, a), edge2 = subtract(c, a);
      const h = cross(direction, edge2);
      const determinant = dot(edge1, h);
      if (Math.abs(determinant) < 1e-8) return false;
      const inverse = 1 / determinant;
      const s = subtract(origin, a);
      const u = inverse * dot(s, h);
      if (u < -1e-6 || u > 1 + 1e-6) return false;
      const q = cross(s, edge1);
      const v = inverse * dot(direction, q);
      if (v < -1e-6 || u + v > 1 + 1e-6) return false;
      const distance = inverse * dot(edge2, q);
      return distance > 1e-6 && distance < 1 - 1e-4;
    }
    function vertexIsVisible(index, rotated) {
      const camera = { x: 0, y: 0, z: 6.2 };
      const direction = subtract(rotated[index], camera);
      return !faces.some(face => {
        if (face.indices.includes(index)) return false;
        const points = face.indices.map(vertexIndex => rotated[vertexIndex]);
        for (let triangle = 1; triangle < points.length - 1; triangle++) {
          if (rayHitsTriangle(camera, direction, points[0], points[triangle], points[triangle + 1])) return true;
        }
        return false;
      });
    }
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const rotated = vertices.map(rotate);
      const visible = faces.map(face => {
        const points = face.indices.map(index => rotated[index]);
        const normal = cross(subtract(points[1], points[0]), subtract(points[2], points[0]));
        const centroid = points.reduce((sum, point) => ({
          x: sum.x + point.x / points.length,
          y: sum.y + point.y / points.length,
          z: sum.z + point.z / points.length
        }), { x: 0, y: 0, z: 0 });
        const depth = points.reduce((sum, point) => sum + point.z, 0) / points.length;
        const facing = dot(normal, { x: -centroid.x, y: -centroid.y, z: 6.2 - centroid.z });
        return { ...face, points, depth, facing };
      }).filter(face => face.facing > 0.0001).sort((a, b) => a.depth - b.depth);
      for (const face of visible) {
        const points = face.points.map(project);
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (const point of points.slice(1)) context.lineTo(point.x, point.y);
        context.closePath();
        context.fillStyle = face.color;
        context.fill();
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 2.2;
        context.lineJoin = 'round';
        context.stroke();
      }
      const shown = new Set(vertices.map((_, index) => index).filter(index => vertexIsVisible(index, rotated)));
      const highlighted = selected === 'all' ? null : new Set(groups[selected]);
      for (const index of shown) {
        if (!highlighted || !highlighted.has(index)) drawMarker(rotated[index], index, false);
      }
      if (highlighted) {
        for (const index of highlighted) if (shown.has(index)) drawMarker(rotated[index], index, true);
      }
    }

    canvas.addEventListener('pointerdown', event => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      yaw -= (event.clientX - lastX) * 0.009;
      pitch = Math.max(-1.4, Math.min(1.4, pitch + (event.clientY - lastY) * 0.009));
      lastX = event.clientX;
      lastY = event.clientY;
      draw();
    });
    const finishDrag = () => { dragging = false; };
    canvas.addEventListener('pointerup', finishDrag);
    canvas.addEventListener('pointercancel', finishDrag);
    canvas.addEventListener('lostpointercapture', finishDrag);
    canvas.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home') { yaw = -0.32; pitch = 0.5; }
      if (event.key === 'ArrowLeft') yaw += 0.16;
      if (event.key === 'ArrowRight') yaw -= 0.16;
      if (event.key === 'ArrowUp') pitch = Math.max(-1.4, pitch - 0.16);
      if (event.key === 'ArrowDown') pitch = Math.min(1.4, pitch + 0.16);
      draw();
    });
    function setView(newYaw, newPitch) { yaw = newYaw; pitch = newPitch; draw(); canvas.focus(); }
    topView.addEventListener('click', () => setView(-0.32, 1.12));
    bottomView.addEventListener('click', () => setView(-0.32, -1.12));
    resetView.addEventListener('click', () => setView(-0.32, 0.5));
    for (const [key, button] of buttons) button.addEventListener('click', () => {
      selected = key;
      for (const [otherKey, otherButton] of buttons) otherButton.setAttribute('aria-pressed', otherKey === key ? 'true' : 'false');
      readout.textContent = key === 'all'
        ? 'Conte por camadas: 10 na base + 10 na junção central + 5 no topo = 25 vértices.'
        : key === 'bottom'
          ? 'Base vermelha: 10 vértices. Use “Ver base” para enxergar o decágono.'
          : key === 'middle'
            ? 'Junção central: 10 vértices onde a faixa azul encontra a cúpula.'
            : 'Topo verde: 5 vértices formam o pentágono.';
      draw();
    });
    figure.dataset.vertexCount = String(vertices.length);
    draw();
    return figure;
  };
})();
