import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Play,
  Pause,
} from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  shortQuote?: string;
  initials: string;
  avatar?: string;
  rating: number;
  resultBadge?: string;
  verified?: boolean;
}

interface ArcDialTestimonialProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayDuration?: number;
}

const AUTOPLAY_DURATION = 7000;

export default function ArcDialTestimonial({
  testimonials,
  autoPlay = true,
  autoPlayDuration = AUTOPLAY_DURATION,
}: ArcDialTestimonialProps) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelCooldown = useRef(false);

  const total = testimonials.length;
  const current = testimonials[activeIndex];
  const shouldAnimate = !prefersReducedMotion;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
      setExpanded(false);
      setProgressKey((k) => k + 1);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const isFocused = containerRef.current.contains(document.activeElement);
      if (!isFocused) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 20) return;
      if (wheelCooldown.current) return;

      wheelCooldown.current = true;
      if (delta > 0) next();
      else prev();

      setTimeout(() => {
        wheelCooldown.current = false;
      }, 400);
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [next, prev]);

  const dragStartX = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
    dragStartX.current = null;
  };

  useEffect(() => {
    if (!autoPlay || isPaused || prefersReducedMotion || total <= 1) return;
    const timer = setTimeout(() => next(), autoPlayDuration);
    return () => clearTimeout(timer);
  }, [autoPlay, isPaused, prefersReducedMotion, total, next, autoPlayDuration, progressKey]);

  const getArcPosition = (offset: number) => {
    const maxOffset = Math.floor(total / 2);
    const clamped = Math.max(-maxOffset, Math.min(maxOffset, offset));
    const normalized = maxOffset === 0 ? 0 : clamped / maxOffset;

    const x = 50 + normalized * 42;
    const y = Math.pow(normalized, 2) * 70;
    const scale = 1 - Math.abs(normalized) * 0.42;
    const opacity = 1 - Math.abs(normalized) * 0.55;
    const zIndex = 10 - Math.round(Math.abs(normalized) * 3);

    return { x, y, scale, opacity, zIndex, clamped };
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      tabIndex={0}
      role="region"
      aria-label="Member testimonials"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="relative mx-auto mb-12 h-64 w-full max-w-5xl sm:h-72">
        {testimonials.map((t, i) => {
          let offset = i - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const pos = getArcPosition(offset);
          const isActive = i === activeIndex;
          const isVisible = Math.abs(pos.clamped) <= Math.floor(total / 2);

          if (!isVisible) return null;

          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View testimonial from ${t.name}`}
              aria-pressed={isActive}
              className="absolute -translate-x-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A84FF]/40 focus-visible:ring-offset-2"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}px`,
                zIndex: pos.zIndex,
              }}
              animate={{
                scale: pos.scale,
                opacity: pos.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 28,
              }}
            >
              <div
                className={`relative flex items-center justify-center overflow-hidden rounded-full border-4 transition-all duration-300 ${
                  isActive
                    ? 'border-[#0A84FF] shadow-2xl shadow-[#0A84FF]/40'
                    : 'border-white shadow-lg'
                }`}
                style={{
                  width: '120px',
                  height: '120px',
                }}
              >
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center text-2xl font-bold text-white transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-[#0A84FF] to-[#A259FF]'
                        : 'bg-[#0B0F1A]'
                    }`}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                )}

                {t.verified && isActive && (
                  <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#0A84FF]">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="relative mx-auto max-w-3xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={shouldAnimate ? { opacity: 0, y: 24 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldAnimate ? { opacity: 0, y: -24 } : { opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl sm:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0A84FF] via-[#A259FF] to-[#00E5FF]" />

            <Quote
              className="mb-4 h-10 w-10 text-[#0A84FF]/25"
              aria-hidden="true"
            />

            <blockquote className="mb-6 text-lg leading-relaxed text-[#0B0F1A] sm:text-xl">
              <span className="text-2xl text-[#0A84FF]">"</span>
              {expanded || current.quote.length <= 180
                ? current.quote
                : `${current.quote.slice(0, 180)}…`}
              <span className="text-2xl text-[#0A84FF]">"</span>
              {current.quote.length > 180 && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="ml-2 inline text-sm font-semibold text-[#0A84FF] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
                  aria-expanded={expanded}
                >
                  {expanded ? t('community.show_less') : t('community.read_more')}
                </button>
              )}
            </blockquote>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div
                className="flex gap-1"
                aria-label={`${current.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < current.rating
                        ? 'fill-[#0A84FF] text-[#0A84FF]'
                        : 'fill-[#E2E8F0] text-[#E2E8F0]'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {current.resultBadge && (
                <span className="inline-flex items-center rounded-full bg-[#00E5FF]/15 px-3 py-1 text-xs font-semibold text-[#0B0F1A]">
                  {current.resultBadge}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#0A84FF] to-[#A259FF] text-base font-bold text-white"
                aria-hidden="true"
              >
                {current.avatar ? (
                  <img
                    src={current.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  current.initials
                )}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#0B0F1A]">{current.name}</p>
                <p className="truncate text-sm text-[#64748B]">
                  {current.role}
                  {current.company && ` · ${current.company}`}
                </p>
              </div>
            </div>

            {autoPlay && !prefersReducedMotion && total > 1 && (
              <svg
                className="absolute bottom-4 right-4 h-8 w-8 -rotate-90"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2"
                />
                <motion.circle
                  key={progressKey}
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#0A84FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 14}
                  initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                  animate={{
                    strokeDashoffset: isPaused
                      ? undefined
                      : 0,
                  }}
                  transition={{
                    duration: autoPlayDuration / 1000,
                    ease: 'linear',
                  }}
                />
              </svg>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#0B0F1A] transition hover:border-[#0A84FF] hover:text-[#0A84FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Testimonial ${i + 1}: ${t.name}`}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2 ${
                  i === activeIndex
                    ? 'w-8 bg-[#0A84FF]'
                    : 'w-2.5 bg-[#E2E8F0] hover:bg-[#CBD5E1]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#0B0F1A] transition hover:border-[#0A84FF] hover:text-[#0A84FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {autoPlay && !prefersReducedMotion && total > 1 && (
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#0B0F1A] transition hover:border-[#0A84FF] hover:text-[#0A84FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}