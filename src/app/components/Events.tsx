import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Expand, Linkedin, MapPin, Mic2, Pause, Plane, Play, UserRound, Video, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from './hooks/useInView';
import tsGroup from '../../assets/images/talkshowMeryl/group.jpg';
import tsSpeaker from '../../assets/images/talkshowMeryl/speaker.jpg';
import tsAudience from '../../assets/images/talkshowMeryl/audience.jpg';
import tsBuffet from '../../assets/images/talkshowMeryl/buffet.jpg';
import tsGuest from '../../assets/images/talkshowMeryl/guest.jpg';
import itTeam from '../../assets/images/itday-koeln/team.jpg';
import itStairs from '../../assets/images/itday-koeln/stairs.jpg';
import itTalk from '../../assets/images/itday-koeln/talk.jpg';
import itTechstack from '../../assets/images/itday-koeln/techstack.jpg';
import akSlides from '../../assets/images/akepson-talkshow/slides.jpg';
import akCommunity from '../../assets/images/akepson-talkshow/community.jpg';
import ymaTitle from '../../assets/images/yma-talkshow/title.jpg';
import ymaInfra from '../../assets/images/yma-talkshow/infrastructure.jpg';
import ymaPortrait from '../../assets/images/yma-talkshow/yma.jpg';

type Photo = { src: string; key: string; position: string };

const SLIDE_MS = 4500;

type EventItem = {
  id: string;
  date: string; // display value
  dateTime: string; // machine-readable
  location?: string;
  type: { label: string; icon: LucideIcon };
  color: string;
  tags: string[];
  /** image is optional: without it a neutral silhouette is shown */
  person: { name: string; image?: string; position?: string; ring: string; linkedin?: string };
  photos: Photo[];
  /** Optional link to a recap post (e.g. LinkedIn) */
  post?: string;
};

const allEvents: EventItem[] = [
  {
    id: 'akepson',
    date: '12.11.2026',
    dateTime: '2026-11-12',
    location: 'Online · Discord',
    type: { label: 'Talk Show', icon: Video },
    color: '#0A84FF',
    tags: ['Data Cleaning', 'Data Quality', 'Data Analytics'],
    person: { name: 'Akepson', ring: 'ring-[#0A84FF]/60' },
    post: 'https://www.linkedin.com/posts/justcode-kl_justcodekl-datacleaning-dataanalytics-activity-7526969001734750208-gMIC',
    photos: [
      { src: akSlides, key: 'slides', position: 'center' },
      { src: akCommunity, key: 'community', position: 'center' },
    ],
  },
  {
    id: 'yma',
    date: '08.11.2026',
    dateTime: '2026-11-08',
    type: { label: 'Talk Show', icon: Mic2 },
    color: '#00E5FF',
    tags: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Terraform', 'GitOps'],
    person: { name: 'Yma Dzounesse', image: ymaPortrait, position: 'center', ring: 'ring-[#00E5FF]/60' },
    post: 'https://www.linkedin.com/posts/justcode-kl_justcodekl-devops-cicd-activity-7525318581656494080-lE7I',
    photos: [
      { src: ymaTitle, key: 'title', position: 'center' },
      { src: ymaInfra, key: 'infrastructure', position: 'center' },
    ],
  },
  {
    id: 'talkshow',
    date: '25.08.2026',
    dateTime: '2026-08-25',
    location: 'RPTU Kaiserslautern',
    type: { label: 'Talk Show', icon: Mic2 },
    color: '#A259FF',
    tags: ['Data Science', 'Data Analytics', 'Data Engineering'],
    person: {
      name: 'Meryl Kwamen',
      image: tsSpeaker,
      position: 'center 18%',
      ring: 'ring-[#A259FF]/60',
      linkedin: 'https://www.linkedin.com/in/meryl-kwamen/',
    },
    post: 'https://www.linkedin.com/posts/justcode-kl_justcodekl-datascience-dataengineering-activity-7499829283264253952-TvxA',
    photos: [
      { src: tsSpeaker, key: 'speaker', position: 'center 30%' },
      { src: tsGuest, key: 'guest', position: 'center 55%' },
      { src: tsGroup, key: 'group', position: 'center 40%' },
      { src: tsAudience, key: 'audience', position: 'center 60%' },
      { src: tsBuffet, key: 'buffet', position: 'center' },
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
      { src: itTeam, key: 'team', position: 'center 40%' },
      { src: itStairs, key: 'stairs', position: 'center 45%' },
      { src: itTalk, key: 'talk', position: 'center 40%' },
      { src: itTechstack, key: 'techstack', position: 'center 30%' },
    ],
  },
];

function EventAlbum({
  event,
  onOpen,
}: {
  event: EventItem;
  onOpen: (photoIndex: number) => void;
}) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const total = event.photos.length;
  const k = `events.items.${event.id}`;

  // Only play while the album is on screen
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (target: number, dir: 1 | -1) => {
      setDirection(dir);
      setIndex(((target % total) + total) % total);
    },
    [total]
  );
  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  const autoplay = !reduceMotion;
  const playing = autoplay && visible && !hovered && !userPaused;
  const photo = event.photos[index];
  const label = t(`${k}.photos.${photo.key}`);

  const controls = [
    { key: 'prev', onClick: prev, icon: ChevronLeft, aria: t('events.prev') },
    ...(autoplay
      ? [
          {
            key: 'pause',
            onClick: () => setUserPaused((v) => !v),
            icon: userPaused ? Play : Pause,
            aria: t(userPaused ? 'events.play' : 'events.pause'),
          },
        ]
      : []),
    { key: 'next', onClick: next, icon: ChevronRight, aria: t('events.next') },
    { key: 'open', onClick: () => onOpen(index), icon: Expand, aria: t('events.open_photo', { label }) },
  ];

  return (
    <div>
      <div
        ref={frameRef}
        className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#0A0E1A] shadow-2xl shadow-black/40 sm:h-[520px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="region"
        aria-roledescription="carousel"
        aria-label={t(`${k}.title`)}
      >
        {/* Slides */}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={photo.key}
            className="absolute inset-0"
            initial={{ opacity: 0, x: direction * 60, scale: 1.04 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) prev();
            }}
          >
            {/* Blurred backdrop keeps portrait photos uncropped */}
            <img
              src={photo.src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
            />
            <button
              type="button"
              onClick={() => onOpen(index)}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
              aria-label={t('events.open_photo', { label })}
            >
              <motion.img
                src={photo.src}
                alt={label}
                draggable={false}
                className="h-full w-full object-contain"
                initial={{ scale: 1 }}
                animate={{ scale: reduceMotion ? 1 : 1.06 }}
                transition={{ duration: SLIDE_MS / 1000 + 1, ease: 'linear' }}
              />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Top: story-style progress bars */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-4 top-4 z-10 flex gap-1.5">
          {event.photos.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => go(i, i >= index ? 1 : -1)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
              aria-label={t(`${k}.photos.${p.key}`)}
              aria-current={i === index}
            >
              {i === index ? (
                <span
                  key={`${photo.key}-active`}
                  className="block h-full w-full origin-left rounded-full bg-white"
                  style={
                    autoplay
                      ? {
                          animation: `jc-album-progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: playing ? 'running' : 'paused',
                        }
                      : undefined
                  }
                  onAnimationEnd={autoplay ? next : undefined}
                />
              ) : (
                <span className="block h-full rounded-full bg-white" style={{ width: i < index ? '100%' : '0%' }} />
              )}
            </button>
          ))}
        </div>

        {/* Bottom: caption + controls */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-xs text-white/60">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={photo.key}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="truncate text-sm font-semibold text-white sm:text-base"
              >
                {label}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            {controls.map(({ key, onClick, icon: Icon, aria }) => (
              <button
                key={key}
                type="button"
                onClick={onClick}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]"
                aria-label={aria}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
        {event.photos.map((p, i) => (
          <button
            key={p.key}
            type="button"
            onClick={() => go(i, i >= index ? 1 : -1)}
            className={`relative h-16 overflow-hidden rounded-xl border transition-all duration-300 sm:h-20 ${
              i === index ? 'border-white/60 opacity-100' : 'border-white/10 opacity-45 hover:opacity-80'
            }`}
            style={i === index ? { boxShadow: `0 0 0 1px ${event.color}, 0 8px 24px -8px ${event.color}` } : undefined}
            aria-label={t(`${k}.photos.${p.key}`)}
            aria-current={i === index}
          >
            <img
              src={p.src}
              alt=""
              className="h-full w-full object-cover"
              style={{ objectPosition: p.position }}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

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
          {event.location && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
              <MapPin className="h-3.5 w-3.5 text-[#00E5FF]" aria-hidden="true" />
              {event.location}
            </span>
          )}
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

        {event.post && (
          <a
            href={event.post}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-[#0A66C2] py-2 pl-2 pr-4 text-sm font-semibold text-white shadow-lg shadow-[#0A66C2]/30 transition hover:-translate-y-0.5 hover:bg-[#004182] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </span>
            {t('events.read_recap')}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        )}

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

        {(() => {
          const { person } = event;
          const content = (
            <>
              {person.image ? (
                <img
                  src={person.image}
                  alt=""
                  className={`h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ${person.ring}`}
                  style={{ objectPosition: person.position }}
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ring-2 ${person.ring}`}
                  style={{ background: `linear-gradient(135deg, ${event.color}40, #A259FF33)` }}
                >
                  <UserRound className="h-7 w-7 text-white/80" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-bold text-white">
                  <span className={person.linkedin ? 'underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-[#0A84FF]' : ''}>
                    {person.name}
                  </span>
                  {person.linkedin && (
                    <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true" />
                  )}
                </p>
                <p className="text-sm text-[#94A3B8]">{t(`${k}.person_role`)}</p>
              </div>
              {person.linkedin && (
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-lg shadow-[#0A66C2]/30 transition-transform group-hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </span>
              )}
            </>
          );
          const base = 'mt-auto flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4';
          return person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${base} transition hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]`}
              aria-label={t('events.linkedin_profile', { name: person.name })}
            >
              {content}
            </a>
          ) : (
            <div className={base}>{content}</div>
          );
        })()}
      </motion.article>

      {/* Photo album */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`lg:col-span-7 ${reversed ? 'lg:order-1' : ''}`}
      >
        <EventAlbum event={event} onOpen={onOpen} />
      </motion.div>
    </div>
  );
}

export default function Events({
  ids,
  variant = 'section',
}: {
  /** Which events to show (default: all) */
  ids?: string[];
  /** 'section' = home page block with link to the events page, 'page' = full events page */
  variant?: 'section' | 'page';
}) {
  const { t } = useTranslation();
  const events = ids ? allEvents.filter((e) => ids.includes(e.id)) : allEvents;
  const isPage = variant === 'page';
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [open, setOpen] = useState<{ event: number; photo: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((o) => {
        if (!o) return o;
        const n = events[o.event].photos.length;
        return { ...o, photo: (o.photo + dir + n) % n };
      });
    },
    [events]
  );

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
    <section
      id={isPage ? undefined : 'talks'}
      className={`relative isolate overflow-hidden ${isPage ? 'pb-8 pt-4' : 'py-24 sm:py-32'}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isPage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="mb-5">
              <span className="jc-eyebrow">{t('events.eyebrow')}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('events.page_heading_start')} <span className="jc-gradient-text">{t('events.page_heading_highlight')}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#94A3B8]">{t('events.intro')}</p>
          </motion.div>
        ) : (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-14 text-center"
          >
            <div className="mb-5">
              <span className="jc-eyebrow">{t('events.home_eyebrow')}</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t('events.home_heading')}</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#94A3B8]">{t('events.home_intro')}</p>
          </motion.div>
        )}

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

        {!isPage && (
          <div className="mt-14 flex justify-center">
            <a
              href="#/events"
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-6 pr-2 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-[#00E5FF]/50 hover:bg-white/[0.08]"
            >
              {t('events.view_all')}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A84FF] transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        )}
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
