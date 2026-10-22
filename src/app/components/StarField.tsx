import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars: { x: number; y: number; z: number; size: number; speed: number }[] = [];
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.1, // Depth
        size: Math.random() * 1.5,
        speed: Math.random() * 2 + 0.5,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Move star diagonally (falling)
        star.x -= star.speed * star.z;
        star.y += star.speed * star.z;

        // Reset if off screen
        if (star.x < 0 || star.y > height) {
          star.x = Math.random() * width;
          star.y = -10;
          star.z = Math.random() * 2 + 0.1;
        }

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.z * 0.5})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.z, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail for larger stars
        if (star.z > 1.2) {
          ctx.strokeStyle = `rgba(0, 229, 255, ${star.z * 0.2})`;
          ctx.lineWidth = star.size * star.z;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x + star.speed * star.z * 5, star.y - star.speed * star.z * 5);
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />;
}