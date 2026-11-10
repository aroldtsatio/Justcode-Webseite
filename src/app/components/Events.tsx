import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, Expand, MapPin, Mic2, Plane, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from './hooks/useInView';
import tsGroup from '../../assets/images/talkshowMeryl/group.jpg';
import tsSpeaker from '../../assets/images/talkshowMeryl/speaker.jpg';
import tsAudience from '../../assets/images/talkshowMeryl/audience.jpg';
import tsBuffet from '../../assets/images/talkshowMeryl/buffet.jpg';
import itTeam from '../../assets/images/itday-koeln/team.jpg';
import itStairs from '../../assets/images/itday-koeln/stairs.jpg';
import itTalk from '../../assets/images/itday-koeln/talk.jpg';
import itTechstack from '../../assets/images/itday-koeln/techstack.jpg';

type Photo = { src: string; key: string; className: string; position: string };

type EventItem = {
  id: string;
  date: string; // display value
  dateTime: string; // machine-readable
  location: string;
  type: { label: string; icon: LucideIcon };
  color: string;
  tags: string[];
  person: { name: string; image: string; position: string; ring: string };
  photos: Photo[];
};

const events: EventItem[] = [
  {
    id: 'talkshow',
    date: '25.08.2026',
    dateTime: '2026-08-25',
    location: 'RPTU Kaiserslautern',
    type: { label: 'Talk Show', icon: Mic2 },
    color: '#A259FF',
    tags: ['Data Science', 'Data Analytics', 'Data Engineering'],
    person: { name: 'Meryl Kwamen', image: tsSpeaker, position: 'center 18%', ring: 'ring-[#A259FF]/60' },
    photos: [
      { src: tsSpeaker, key: 'speaker', className: 'row-span-2', position: 'center 30%' },
      { src: tsGroup, key: 'group', className: 'col-span-2 row-span-2', position: 'center 40%' },
      { src: tsAudience, key: 'audience', className: '', position: 'center 60%' },
      { src: tsBuffet, key: 'buffet', className: 'sm:col-span-2', position: 'center' },
    ],
  },
  {
    id: 'itday',
    date: '2026',
    dateTime: '2026',
    location: 'Köln',
    type: { label: 'IT Day', icon: Plane },
    color: '#00E5FF',
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'Terraform', 'DevOps'],
    person: { name: 'Team JUSTCODE-KL', image: itTeam, position: 'center 25%', ring: 'ring-[#00E5FF]/60' },
    photos: [
      { src: itTeam, key: 'team', className: 'row-span-2', position: 'center 40%' },
      { src: itStairs, key: 'stairs', className: 'row-span-2', position: 'center 45%' },
      { src: itTalk, key: 'talk', className: '', position: 'center 40%' },
      { src: itTechstack, key: 'techstack', className: '', position: 'center 30%' },
    ],
  },
];

function EventBlock({
  event,
  reversed,
  onOpen,
}: {
  event: EventItem;
  reversed: boolean;
  onOpen: (photoIndex: number) => void;
}) {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const TypeIcon = event.type.icon;
  const k = `events.items.${event.id}`;

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Info card */}
      <motion.article
        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`jc-card flex flex-col p-7 sm:p-8 lg:col-span-5 ${reversed ? 'lg:order-2' : ''}`}
        style={{ '--glow': event.color } as React.CSSProperties}
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[#CBD5E1]">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
            <CalendarDays className="h-3.5 w-3.5 text-[#00E5FF]" aria-hidden="true" />
            <time dateTime={event.dateTime}>{event.date}</time>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
            <MapPin className="h-3.5 w-3.5 text-[#00E5FF]" aria-hidden="true" />
            {event.location}
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1"
            style={{ borderColor: `${event.color}4D`, backgroundColor: `${event.color}1A`, color: event.color }}
          >
            <TypeIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {event.type.label}
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-bold leading-tight text-white sm:text-3xl">{t(`${k}.title`)}</h3>
        <p className="mb-6 font-mono text-sm text-[#7DC4FF]">{t(`${k}.subtitle`)}</p>
        <p className="mb-8 leading-relaxed text-[#94A3B8]">{t(`${k}.description`)}</p>

        <div className="mb-8 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[#CBD5E1]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <img
            src={event.person.image}
            alt=""
            className={`h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ${event.person.ring}`}
            style={{ objectPosition: event.person.position }}
            loading="lazy"
          />
          <div className="min-w-0">
            <p className="font-bold text-white">{event.person.name}</p>
            <p className="text-sm text-[#94A3B8]">{t(`${k}.person_role`)}</p>
          </div>
        </div>
      </motion.article>

      {/* Photo bento grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:grid-cols-3 sm:gap-4 lg:col-span-7 ${
          reversed ? 'lg:order-1' : ''
        }`}
      >
        {event.photos.map((photo, i) => {
          const label = t(`${k}.photos.${photo.key}`);
          return (
            <button
              key={photo.key}
              type="button"
              onClick={() => onOpen(i)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] ${photo.className}`}
              aria-label={t('events.open_photo', { label })}
            >
              <img
                src={photo.src}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: photo.position }}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070A13]/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-left text-xs font-medium text-white/90">
                <span className="truncate">{label}</span>
                <Expand className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Events() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [open, setOpen] = useState<{ event: number; photo: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: 1 | -1) => {
    setOpen((o) => {
      if (!o) return o;
      const n = events[o.event].photos.length;
      return { ...o, photo: (o.photo + dir + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const current = open ? events[open.event].photos[open.photo] : null;
  const currentLabel = open && current ? t(`events.items.${events[open.event].id}.photos.${current.key}`) : '';

  return (
    <section id="talks" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <div className="mb-5">
            <span className="jc-eyebrow">{t('events.eyebrow')}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t('events.heading')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-[#94A3B8]">{t('events.intro')}</p>
        </motion.div>

        <div className="space-y-16 sm:space-y-24">
          {events.map((event, i) => (
            <EventBlock
              key={event.id}
              event={event}
              reversed={i % 2 === 1}
              onOpen={(photo) => setOpen({ event: i, photo })}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#04060C]/90 p-4 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={currentLabel}
          >
            <motion.img
              key={`${open.event}-${open.photo}`}
              src={current.src}
              alt={currentLabel}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-h-[85vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-sm text-white/90">
              {currentLabel}
            </p>
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
              aria-label={t('events.close')}
            >
              <X className="h-5 w-5" />
            </button>
            {(['prev', 'next'] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(dir === 'next' ? 1 : -1);
                }}
                className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 ${
                  dir === 'next' ? 'right-4' : 'left-4'
                }`}
                aria-label={t(`events.${dir}`)}
              >
                {dir === 'next' ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
