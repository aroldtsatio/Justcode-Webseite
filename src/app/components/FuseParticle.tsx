import { useEffect, useRef } from 'react';

interface FuseParticleProps {
  color?: string;
  intensity?: number;
  speed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  size: number;
  phase: number;
  band: number;
}

/**
 * FuseParticle — animated particle bands for atmospheric backgrounds.
 * Lightweight canvas-based, no external dependencies.
 *
 * Usage:
 *   <FuseParticle intensity={0.4} speed={0.8} />
 */
export default function FuseParticle({
  color = '#00D4FF',
  intensity = 0.6,
  speed = 1,
  className = '',
}: FuseParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const particles: Particle[] = [];
    const bandCount = 3;

    for (let band = 0; band < bandCount; band++) {
      for (let i = 0; i < 80; i++) {
        const baseY = (height / bandCount) * band + height / (bandCount * 2);
        particles.push({
          x: Math.random() * width,
          y: baseY,
          baseY,
          speed: (0.15 + Math.random() * 0.35) * speed,
          size: 0.8 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          band,
        });
      }
    }

    let time = 0;

    const animate = () => {
      time += 0.008 * speed;

      ctx.clearRect(0, 0, width, height);

      // Soft bottom-up glow
      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, `rgba(0, 212, 255, ${0.04 * intensity})`);
      gradient.addColorStop(0.5, `rgba(15, 82, 186, ${0.02 * intensity})`);
      gradient.addColorStop(1, 'rgba(7, 26, 82, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width + 10) p.x = -10;

        const wave = Math.sin(time * 1.2 + p.phase + p.band * 0.8) * 12;
        const y = p.baseY + wave;
        const alpha = (0.2 + (y / height) * 0.6) * intensity;

        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 1.5) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, y, p.size * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [color, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}