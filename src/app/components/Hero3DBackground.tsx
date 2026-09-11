import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  z: number;
  pulse: number;
  speed: number;
};

type Trace = {
  lane: number;
  start: number;
  length: number;
  speed: number;
};

export default function Hero3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let lastTime = performance.now();

    const nodes: Node[] = Array.from({ length: 42 }, () => ({
      x: (Math.random() - 0.5) * 1200,
      z: Math.random() * 1400,
      pulse: Math.random() * Math.PI * 2,
      speed: 18 + Math.random() * 30,
    }));

    const traces: Trace[] = Array.from({ length: 18 }, (_, index) => ({
      lane: (index % 9) - 4,
      start: Math.random() * 1500,
      length: 140 + Math.random() * 260,
      speed: 90 + Math.random() * 120,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (x: number, z: number) => {
      const horizon = height * 0.38;
      const depth = 1500;
      const perspective = 1 - z / depth;
      const y = horizon + perspective * height * 0.72;
      const screenX = width / 2 + x * perspective;
      return { x: screenX, y, scale: perspective };
    };

    const drawLine = (
      fromX: number,
      fromZ: number,
      toX: number,
      toZ: number,
      alpha: number,
      lineWidth = 1,
    ) => {
      const from = project(fromX, fromZ);
      const to = project(toX, toZ);

      ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(2, 11, 46, 0.2)');
      gradient.addColorStop(0.45, 'rgba(7, 26, 82, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0.08)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const gridOffset = (time * 0.05) % 100;
      const farZ = 1450;
      const nearZ = 40;

      for (let x = -900; x <= 900; x += 100) {
        const emphasis = x === 0 ? 0.28 : 0.11;
        drawLine(x, farZ, x, nearZ, emphasis, x === 0 ? 1.8 : 1);
      }

      for (let z = nearZ + gridOffset; z <= farZ; z += 100) {
        const depthAlpha = 0.05 + (1 - z / farZ) * 0.2;
        drawLine(-900, z, 900, z, depthAlpha, 1);
      }

      traces.forEach((trace) => {
        trace.start -= trace.speed * delta;
        if (trace.start + trace.length < 0) {
          trace.start = 1500 + Math.random() * 240;
        }

        const x = trace.lane * 100;
        const head = trace.start;
        const tail = trace.start + trace.length;
        const headPoint = project(x, head);
        const tailPoint = project(x, tail);
        const alpha = Math.max(0, Math.min(0.75, 1 - head / 1500));

        const lineGradient = ctx.createLinearGradient(tailPoint.x, tailPoint.y, headPoint.x, headPoint.y);
        lineGradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
        lineGradient.addColorStop(0.55, `rgba(0, 212, 255, ${alpha * 0.28})`);
        lineGradient.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(tailPoint.x, tailPoint.y);
        ctx.lineTo(headPoint.x, headPoint.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(headPoint.x, headPoint.y, 2.5 + headPoint.scale * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((node) => {
        node.z -= node.speed * delta;
        node.pulse += delta * 2;
        if (node.z < 25) {
          node.z = 1450;
          node.x = (Math.random() - 0.5) * 1200;
        }

        const point = project(node.x, node.z);
        const pulse = 0.45 + Math.sin(node.pulse) * 0.25;
        const alpha = Math.max(0, (1 - node.z / 1500) * 0.55 + pulse * 0.22);
        const radius = 1.6 + point.scale * 4;

        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius * 2.8, 0, Math.PI * 2);
        ctx.stroke();
      });

      const sweepY = height * 0.34 + ((time * 0.045) % (height * 0.58));
      const sweep = ctx.createLinearGradient(0, sweepY - 40, 0, sweepY + 40);
      sweep.addColorStop(0, 'rgba(0, 212, 255, 0)');
      sweep.addColorStop(0.5, 'rgba(0, 212, 255, 0.12)');
      sweep.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = sweep;
      ctx.fillRect(0, sweepY - 40, width, 80);

      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,212,255,0.18),transparent_28%),linear-gradient(to_bottom,rgba(7,26,82,0)_0%,rgba(7,26,82,0.4)_62%,rgba(7,26,82,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071A52] to-transparent" />
    </div>
  );
}
