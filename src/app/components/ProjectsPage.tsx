import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import NavbarDark from './NavbarDark';
import Footer from './Footer';
import { projects, type Project } from '../data/projects';

function DoneCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const Icon = project.icon;
  const k = `projects.items.${project.id}`;
  const subtitle = t(`${k}.subtitle`, { defaultValue: '' });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className="jc-card flex flex-col overflow-hidden"
      style={{ '--glow': project.color } as React.CSSProperties}
    >
      {/* Visual */}
      <div className="relative h-52 overflow-hidden border-b border-white/10 sm:h-60">
        {project.image ? (
          <img src={project.image} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${project.color}40, transparent 60%), radial-gradient(circle at 80% 90%, #0A84FF30, transparent 55%), #0A0E1A`,
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 backdrop-blur"
              style={{ backgroundColor: `${project.color}1F`, color: project.color }}
            >
              <Icon className="h-10 w-10" aria-hidden="true" />
            </div>
          </div>
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#070A13]/80 px-3 py-1 font-mono text-xs font-medium text-emerald-300 backdrop-blur">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {t('projects.done_status')}
          {project.date && ` · ${project.date}`}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="mb-1 text-2xl font-bold text-white">{t(`${k}.name`)}</h3>
        {subtitle ? <p className="mb-4 font-mono text-sm text-[#7DC4FF]">// {subtitle}</p> : <div className="mb-3" />}
        <p className="mb-6 leading-relaxed text-[#94A3B8]">{t(`${k}.desc`)}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-[#CBD5E1]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#0A84FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0A84FF]/25 transition hover:-translate-y-0.5 hover:bg-[#0066CC]"
          >
            {t('projects.live')}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function PlannedCard({ project, index }: { project: Project; index: number }) {
  const { t } = useTranslation();
  const Icon = project.icon;
  const k = `projects.items.${project.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.06 }}
      className="jc-card flex flex-col p-6"
      style={{ '--glow': project.color } as React.CSSProperties}
    >
      <div className="mb-5 flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
          style={{ backgroundColor: `${project.color}1A`, color: project.color }}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/10 px-2.5 py-1 font-mono text-[11px] text-[#93C5FD]">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {t('projects.planned_short')}
        </span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{t(`${k}.name`)}</h3>
      <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-[#94A3B8]">{t(`${k}.desc`)}</p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-[#CBD5E1]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const done = projects.filter((p) => !p.planned);
  const planned = projects.filter((p) => p.planned);

  return (
    <>
      <NavbarDark />
      <main className="relative min-h-screen pb-24 pt-32">
        {/* Header */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <a
            href="#team"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#CBD5E1] backdrop-blur transition hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('workshops.back')}
          </a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="jc-eyebrow">{t('projects.eyebrow')}</span>
            </div>
            <h1 className="mb-6 max-w-4xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {t('projects.page_heading_start')} <span className="jc-gradient-text">{t('projects.page_heading_highlight')}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#94A3B8]">{t('projects.intro')}</p>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm text-[#CBD5E1]">
              <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                {t('projects.count_done', { count: done.length })}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5">
                <Clock className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
                {t('projects.count_planned', { count: planned.length })}
              </span>
            </div>
          </motion.div>
        </section>

        {/* Completed */}
        <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34D399]" aria-hidden="true" />
            {t('projects.section_done')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {done.map((p, i) => (
              <DoneCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* Planned */}
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0A84FF] shadow-[0_0_12px_#0A84FF]" aria-hidden="true" />
            {t('projects.section_planned')}
          </h2>
          <p className="mb-8 text-[#94A3B8]">{t('projects.section_planned_text')}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {planned.map((p, i) => (
              <PlannedCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="jc-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{t('projects.cta_title')}</h2>
              <p className="text-[#94A3B8]">{t('projects.cta_text')}</p>
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
