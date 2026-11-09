import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Code2, Users, Rocket, Briefcase } from 'lucide-react';
import { useInView } from './hooks/useInView';

const pillars = [
  {
    icon: Code2,
    key: '0',
    color: '#0A84FF',
  },
  {
    icon: Users,
    key: '1',
    color: '#A259FF',
  },
  {
    icon: Rocket,
    key: '2',
    color: '#00E5FF',
  },
  {
    icon: Briefcase,
    key: '3',
    color: '#0A84FF',
  },
];

export default function WhatWeDo() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={ref} 
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="mb-5">
            <span className="jc-eyebrow">{t('what_we_do.eyebrow')}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('what_we_do.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#94A3B8]">
            {t('what_we_do.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="jc-card group overflow-hidden p-8"
                style={{ '--glow': pillar.color } as React.CSSProperties}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundColor: pillar.color }}
                />

                <div className="relative mb-6 flex items-start justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${pillar.color}1A`, color: pillar.color }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-sm font-semibold text-white/30">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="relative mb-3 text-2xl font-bold text-white">
                  {t(`what_we_do.pillars.${pillar.key}.title`)}
                </h3>
                <p className="relative mb-6 leading-relaxed text-[#94A3B8]">{t(`what_we_do.pillars.${pillar.key}.desc`)}</p>

                <div className="relative flex flex-wrap gap-2">
                  {(t(`what_we_do.pillars.${pillar.key}.tags`, { returnObjects: true }) as string[]).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-[#CBD5E1]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}