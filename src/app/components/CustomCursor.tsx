import { useEffect, useRef, useState } from 'react';

/**
 * JUSTCODE-KL custom cursor
 *
 * - Only enabled when:
 *   1. A fine pointer is detected (mouse / trackpad)
 *   2. The user has NOT requested reduced motion
 * - Adds / removes the `has-custom-cursor` class on <body>
 *   so the system cursor is hidden only when this component is mounted
 * - Fully cleans up listeners and the body class on unmount
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Capability detection: fine pointer + motion allowed
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const shouldEnable = finePointer.matches && !noMotion.matches;
      setEnabled(shouldEnable);

      if (shouldEnable) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    update();

    finePointer.addEventListener('change', update);
    noMotion.addEventListener('change', update);

    return () => {
      finePointer.removeEventListener('change', update);
      noMotion.removeEventListener('change', update);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  // Mouse tracking + hover detection
  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hasMoved = false;

    const handleMove = (e: PointerEvent) => {
      // `pointer: fine` already guarantees a mouse in most cases,
      // but we still filter to avoid a pseudo-cursor on stylus input.
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;

      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
      }
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      setIsHovering(Boolean(interactive));
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerover', handleOver, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={[
        'custom-cursor',
        isVisible ? 'is-visible' : '',
        isHovering ? 'is-hovering' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="custom-cursor__core" />
    </div>
  );
}