import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CalendarDays, FileText, GitBranch, KanbanSquare, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import NavbarDark from './NavbarDark';
import Footer from './Footer';

type Workshop = {
  id: string;
  dateTime: string;
  icon: LucideIcon;
  color: string;
};

// Chronological order; rendered newest first
const workshops: Workshop[] = [
  {
    id: 'git',
    dateTime: '2026-05',
    icon: GitBranch,
    color: '#0A84FF',
  },
  {
    id: 'trello',
    dateTime: '2026-07',
    icon: KanbanSquare,
    color: '#A259FF',
  },
  {
    id: 'career',
    dateTime: '2026-08',
    icon: FileText,
    color: '#00E5FF',
  },
];

export default function Workshops() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const list = [...workshops].reverse();

  return (
    <>
      <NavbarDark />
      <main className="relative min-h-screen pb-24 pt-32">
        {/* Header */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <a
            href="#team"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#CBD5E1] backdrop-blur transition hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('workshops.back')}
          </a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="jc-eyebrow">{t('workshops.eyebrow')}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('workshops.heading_start')} <span className="jc-gradient-text">{t('workshops.heading_highlight')}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#94A3B8]">{t('workshops.intro')}</p>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm text-[#CBD5E1]">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <Wrench className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {t('workshops.count', { count: workshops.length })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <CalendarDays className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {t('workshops.period')}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
          <ol className="relative space-y-8 border-l border-white/10 pl-8 sm:pl-12">
            {list.map((w, i) => {
              const Icon = w.icon;
              const k = `workshops.items.${w.id}`;
              return (
                <motion.li
                  key={w.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-8 h-4 w-4 rounded-full border-2 border-[#070A13] sm:-left-[57px]"
                    style={{ backgroundColor: w.color, boxShadow: `0 0 16px ${w.color}` }}
                  />

                  <article
                    className="jc-card overflow-hidden p-7 sm:p-8"
                    style={{ '--glow': w.color } as React.CSSProperties}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
                      style={{ backgroundColor: w.color }}
                    />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10"
                        style={{ backgroundColor: `${w.color}1A`, color: w.color }}
                      >
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <time
                          dateTime={w.dateTime}
                          className="mb-2 inline-block font-mono text-xs uppercase tracking-wider"
                          style={{ color: w.color }}
                        >
                          {t(`${k}.date`)}
                        </time>
                        <h2 className="mb-1 text-2xl font-bold text-white sm:text-3xl">{t(`${k}.title`)}</h2>
                        <p className="mb-4 font-mono text-sm text-[#7DC4FF]">{t(`${k}.subtitle`)}</p>
                        <p className="mb-6 leading-relaxed text-[#94A3B8]">{t(`${k}.description`)}</p>

                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                          {t('workshops.learned')}
                        </h3>
                        <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                          {(t(`${k}.points`, { returnObjects: true }) as string[]).map((point) => (
                            <li key={point} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                style={{ backgroundColor: w.color }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {(t(`${k}.tags`, { returnObjects: true }) as string[]).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[#CBD5E1]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="jc-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{t('workshops.cta_title')}</h2>
              <p className="text-[#94A3B8]">{t('workshops.cta_text')}</p>
            </div>
            <a
              href="#contact"
              className="group inline-flex min-h-[52px] flex-shrink-0 items-center gap-2 rounded-full bg-[#0A84FF] px-7 font-semibold text-white shadow-lg shadow-[#0A84FF]/30 transition hover:-translate-y-0.5 hover:bg-[#0066CC]"
            >
              {t('nav.join')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
