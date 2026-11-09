import { useEffect, useRef } from 'react';

/**
 * Global, fixed background for the whole site:
 *  - deep navy base
 *  - slowly drifting aurora blobs in brand colors (blue / purple / cyan)
 *  - fine grid masked to fade out toward the edges
 *  - soft spotlight that follows the cursor (desktop only)
 */
export default function SiteBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      // Cursor-following border glow on .jc-card elements
      const card = (e.target as HTMLElement | null)?.closest?.('.jc-card') as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }

      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--spot-x', `${x}px`);
        el.style.setProperty('--spot-y', `${y}px`);
        el.style.opacity = '1';
        frame = 0;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="jc-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="jc-aurora jc-aurora--blue" />
      <div className="jc-aurora jc-aurora--purple" />
      <div className="jc-aurora jc-aurora--cyan" />
      <div className="jc-grid" />
      <div ref={spotRef} className="jc-spotlight" />
      <div className="jc-vignette" />
    </div>
  );
}
