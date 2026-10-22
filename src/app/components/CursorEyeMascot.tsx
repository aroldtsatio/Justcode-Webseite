import { useEffect, useRef, useState } from 'react';

export default function CursorEyeMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 120);
      const angle = Math.atan2(deltaY, deltaX);

      const pupilX = Math.cos(angle) * distance * 0.12;
      const pupilY = Math.sin(angle) * distance * 0.12;

      setMousePos({ x: pupilX, y: pupilY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center gap-6 select-none"
      aria-hidden="true"
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#0B0F1A] bg-white shadow-2xl transition-all duration-300 ${
            isBlinking ? 'scale-y-10' : 'scale-y-100'
          }`}
        >
          {/* Pupil / Heart */}
          <div
            className="absolute flex items-center justify-center transition-all duration-150 ease-out"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            {isHovering ? (
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 fill-[#FF3D9A] animate-pulse"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#0B0F1A]" />
            )}
          </div>
          
          {/* Glint (highlight) */}
          <div 
            className="absolute top-5 left-6 h-3.5 w-3.5 rounded-full bg-white opacity-70"
          />
        </div>
      ))}
    </div>
  );
}