import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CalendarDays, Mic2, Play, Radio, Users } from 'lucide-react';
import { useInView } from './hooks/useInView';

function TalkStage3D() {
  const panels = [
    { label: 'AI', x: '-78%', y: '-18%', delay: 0 },
    { label: 'WEB', x: '78%', y: '-8%', delay: 0.2 },
    { label: 'CLOUD', x: '-58%', y: '36%', delay: 0.4 },
    { label: 'DATA', x: '56%', y: '34%', delay: 0.6 },
  ];

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-3xl overflow-visible md:h-[440px]">
      <div
        className="absolute inset-x-4 bottom-8 top-8"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute left-1/2 top-[57%] h-52 w-[82%] -translate-x-1/2 rounded-[50%] border border-[#00D4FF]/35 bg-[#00D4FF]/5 shadow-[0_0_80px_rgba(0,212,255,0.22)]"
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          style={{ transform: 'translateX(-50%) rotateX(68deg)' }}
        />

        <motion.div
          className="absolute left-1/2 top-[55%] h-40 w-[64%] -translate-x-1/2 rounded-[50%] border border-white/15 bg-gradient-to-r from-[#0F52BA]/30 via-[#00D4FF]/10 to-[#0F52BA]/30"
          animate={{ boxShadow: ['0 0 28px rgba(0,212,255,0.18)', '0 0 60px rgba(0,212,255,0.34)', '0 0 28px rgba(0,212,255,0.18)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translateX(-50%) rotateX(68deg) translateZ(24px)' }}
        />

        <motion.div
          className="absolute left-1/2 top-[45%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#00D4FF]/45 bg-gradient-to-br from-white/15 to-white/5 shadow-[0_24px_80px_rgba(0,212,255,0.24)] backdrop-blur-md"
          animate={{ y: [-8, 8, -8], rotateY: [-10, 12, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-4 rounded-xl border border-white/15 bg-[#071A52]/70" />
          <Mic2 className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-[#00D4FF]" />
        </motion.div>

        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute left-1/2 top-[45%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00D4FF]/25"
            animate={{ scale: [0.65, 1.75], opacity: [0.45, 0] }}
            transition={{ duration: 2.8, delay: ring * 0.65, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        {panels.map((panel) => (
          <motion.div
            key={panel.label}
            className="absolute left-1/2 top-1/2 flex h-16 w-28 items-center justify-center rounded-lg border border-[#00D4FF]/25 bg-[#071A52]/70 text-xs font-bold text-white/80 shadow-[0_0_32px_rgba(0,212,255,0.12)] backdrop-blur-md"
            animate={{ y: [0, -10, 0], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 3.4, delay: panel.delay, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              transform: `translate(${panel.x}, ${panel.y}) rotateX(12deg) rotateY(${panel.x.startsWith('-') ? '18deg' : '-18deg'})`,
            }}
          >
            {panel.label}
          </motion.div>
        ))}

        <div className="absolute left-1/2 top-[57%] h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00D4FF]/45 to-transparent" />
        <div className="absolute left-1/2 top-[67%] h-px w-[58%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>
    </div>
  );
}

export default function Talks() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.16 });

  const talks = [
    { icon: Radio, title: 'Live Sessions', meta: 'Weekly format' },
    { icon: Users, title: 'Student Speakers', meta: 'Peer knowledge' },
    { icon: CalendarDays, title: 'Open Topics', meta: 'AI, Web, Cloud' },
  ];

  return (
    <section id="talks" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-[#071A52] via-[#081F63] to-[#071A52] py-24">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,212,255,0.18),transparent_34%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-sm font-medium text-[#00D4FF] backdrop-blur-sm">
            <Mic2 className="h-4 w-4" />
            {t('nav.talks')}
          </div>

          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            {t('talks.title')}
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0">
            {t('talks.subtitle')}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:max-w-2xl">
            {talks.map((talk, index) => {
              const Icon = talk.icon;

              return (
                <motion.div
                  key={talk.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + index * 0.1, duration: 0.55 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-sm"
                >
                  <Icon className="mb-3 h-5 w-5 text-[#00D4FF]" />
                  <h3 className="text-sm font-semibold text-white">{talk.title}</h3>
                  <p className="mt-1 text-xs text-white/55">{talk.meta}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] px-6 py-3 font-semibold text-white shadow-lg shadow-[#00D4FF]/20"
          >
            <Play className="h-4 w-4" />
            {t('talks.learn_more')}
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <TalkStage3D />
        </motion.div>
      </div>
    </section>
  );
}
