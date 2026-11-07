(() => {
  const colors = {
    trapezoids: '#EF3B39',
    rectangles: '#18A558',
    top: '#FFD633',
    bottom: '#147BDE'
  };

  const ring = (radius, height) => Array.from({ length: 6 }, (_, index) => {
    const angle = index * Math.PI / 3;
    return { x: radius * Math.cos(angle), y: height, z: radius * Math.sin(angle) };
  });
  const lower = ring(1.3, -1.2);
  const middle = ring(1.3, 0);
  const upper = ring(0.73, 1.15);
  const faces = [];
  for (let index = 0; index < 6; index++) {
    const next = (index + 1) % 6;
    faces.push({ points: [lower[index], middle[index], middle[next], lower[next]], color: colors.rectangles });
    faces.push({ points: [middle[index], upper[index], upper[next], middle[next]], color: colors.trapezoids });
  }
  faces.push({ points: [...upper].reverse(), color: colors.top });
  faces.push({ points: lower, color: colors.bottom });

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  window.createHexSolidViewer = function createHexSolidViewer(diagram) {
    const figure = element('figure', 'solid-diagram solid-interactive');
    const stage = element('div', 'solid-stage');
    const canvas = document.createElement('canvas');
    canvas.width = 700;
    canvas.height = 490;
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Modelo 3D da peça hexagonal. Arraste para girar. As faces trapezoidais são vermelhas, as retangulares verdes, o topo amarelo e a base inferior azul. Use também as setas do teclado para girar.');
    canvas.textContent = 'Modelo tridimensional da peça hexagonal com quatro grupos de faces.';
    const instruction = element('span', 'solid-instruction', 'Arraste para girar ↔');
    const reset = element('button', 'solid-reset', 'Voltar à posição inicial');
    reset.type = 'button';
    stage.append(canvas, instruction, reset);

    const legend = element('div', 'solid-legend');
    const groups = [
      [colors.trapezoids, 'Vermelho', '6 trapézios iguais'],
      [colors.rectangles, 'Verde', '6 retângulos iguais'],
      [colors.top, 'Amarelo', 'topo hexagonal menor'],
      [colors.bottom, 'Azul', 'base hexagonal inferior']
    ];
    for (const [color, label, description] of groups) {
      const item = element('div', 'solid-legend-item');
      const swatch = element('span', 'solid-swatch');
      swatch.style.backgroundColor = color;
      const copy = element('span');
      const name = element('strong', '', label);
      const detail = element('small', '', description);
      copy.append(name, detail);
      item.append(swatch, copy);
      legend.append(item);
    }

    const caption = element('figcaption');
    const captionText = element('span', '', 'Gire a peça para observar o topo e a base inferior. A face que une os dois sólidos fica interna e não é pintada.');
    const staticLink = element('a', '', 'Ver esquema fixo ↗');
    staticLink.href = diagram.src;
    staticLink.target = '_blank';
    staticLink.rel = 'noopener';
    caption.append(captionText, staticLink);
    figure.append(stage, legend, caption);

    const context = canvas.getContext('2d');
    let yaw = 0.3;
    let pitch = 0.48;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function rotate(point) {
      const cosineYaw = Math.cos(yaw);
      const sineYaw = Math.sin(yaw);
      const x = point.x * cosineYaw + point.z * sineYaw;
      const z = -point.x * sineYaw + point.z * cosineYaw;
      const cosinePitch = Math.cos(pitch);
      const sinePitch = Math.sin(pitch);
      return {
        x,
        y: point.y * cosinePitch - z * sinePitch,
        z: point.y * sinePitch + z * cosinePitch
      };
    }

    function project(point) {
      const factor = 5.5 / (5.5 - point.z);
      return { x: 350 + point.x * 114 * factor, y: 245 - point.y * 114 * factor };
    }

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const visible = faces.map(face => {
        const points = face.points.map(rotate);
        const a = points[0], b = points[1], c = points[2];
        const normalZ = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        return { points, color: face.color, normalZ, depth: points.reduce((sum, point) => sum + point.z, 0) / points.length };
      }).filter(face => face.normalZ > 0.0001).sort((a, b) => a.depth - b.depth);

      for (const face of visible) {
        const projected = face.points.map(project);
        context.beginPath();
        context.moveTo(projected[0].x, projected[0].y);
        for (const point of projected.slice(1)) context.lineTo(point.x, point.y);
        context.closePath();
        context.fillStyle = face.color;
        context.fill();
        context.strokeStyle = '#173B3E';
        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.stroke();
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
      yaw += (event.clientX - lastX) * 0.009;
      pitch += (event.clientY - lastY) * 0.009;
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
      if (event.key === 'Home') { yaw = 0.3; pitch = 0.48; }
      if (event.key === 'ArrowLeft') yaw -= 0.16;
      if (event.key === 'ArrowRight') yaw += 0.16;
      if (event.key === 'ArrowUp') pitch -= 0.16;
      if (event.key === 'ArrowDown') pitch += 0.16;
      draw();
    });
    reset.addEventListener('click', () => { yaw = 0.3; pitch = 0.48; draw(); canvas.focus(); });
    draw();
    return figure;
  };
})();
