import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, FolderGit2, Wrench, Calendar, ShieldCheck } from 'lucide-react';
import { useInView } from './hooks/useInView';
import ArcDialTestimonial, { Testimonial } from './ArcDialTestimonial';
import { images } from '../../assets/images';

// Counter with progress bar
function AnimatedCounter({ end, isInView, duration = 2000 }: { end: number; isInView: boolean; duration?: number }) {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progressRatio, 3);
      
      setCount(Math.floor(eased * end));
      setProgress(eased * 100);

      if (progressRatio < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, isInView, duration]);

  return { count, progress };
}

// Real stats from JUSTCODE-KL
const stats = [
  { icon: Users, value: 20, max: 50, key: 'members', color: '#0A84FF' },
  { icon: FolderGit2, value: 3, max: 10, key: 'projects', color: '#A259FF' },
  { icon: Wrench, value: 5, max: 15, key: 'workshops', color: '#00E5FF' },
  { icon: Calendar, value: 3, max: 10, key: 'events', color: '#0A84FF' },
];

// ALL 5 TESTIMONIALS
const testimonials: Omit<Testimonial, 'role' | 'company' | 'quote' | 'resultBadge'>[] = [
  {
    id: '1',
    name: 'Sarah M.',
    initials: 'SM',
    avatar: images.itachi,
    rating: 5,
    verified: true,
  },
  {
    id: '2',
    name: 'David K.',
    initials: 'DK',
    avatar: undefined,
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    name: 'Lea B.',
    initials: 'LB',
    avatar: undefined,
    rating: 5,
    verified: true,
  },
  {
    id: '4',
    name: 'Tom R.',
    initials: 'TR',
    avatar: undefined,
    rating: 5,
    verified: true,
  },
  {
    id: '5',
    name: 'Anna P.',
    initials: 'AP',
    avatar: undefined,
    rating: 5,
    verified: true,
  },
];

function StatCard({ stat, index, isInView }: { stat: typeof stats[0], index: number, isInView: boolean }) {
  const Icon = stat.icon;
  const { t } = useTranslation();
  const { count, progress } = AnimatedCounter({ end: stat.value, isInView });
  
  const percentage = Math.min((count / stat.max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="jc-card overflow-hidden p-6 text-center hover:-translate-y-1"
      style={{ '--glow': stat.color } as React.CSSProperties}
    >
      <div 
        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform"
        style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      
      <div className="font-mono text-3xl font-semibold text-white sm:text-4xl">
        {count}<span className="text-xl" style={{ color: stat.color }}>+</span>
      </div>
      
      <div className="mt-1 text-sm font-medium uppercase tracking-wider text-[#94A3B8]">
        {t(`community.${stat.key}`)}
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: stat.color, boxShadow: `0 0 12px ${stat.color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export default function Community() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section id="team" ref={ref} className="relative isolate overflow-hidden py-24 sm:py-32">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20 text-center"
        >
          <div className="mb-5">
            <span className="jc-eyebrow">{t('community.eyebrow')}</span>
          </div>
          <h2 className="mb-12 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('community.stats_title')}
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={t(`community.${stat.key}`)} stat={stat} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Trust Bar */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3 text-sm font-medium text-[#94A3B8]">
              <ShieldCheck className="h-5 w-5 text-[#0A84FF]" />
              <span>{t('community.official')}</span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="flex items-center gap-3">
               <span className="text-sm text-[#94A3B8]">{t('community.hosted')}</span>
               <span className="text-base font-bold text-white">RPTU Kaiserslautern</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials (Arc Dial) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              {t('community.testimonials_title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#94A3B8]">
              {t('community.testimonials_subtitle')}
            </p>
          </div>

          <ArcDialTestimonial
            testimonials={testimonials.map((member) => ({
              ...member,
              role: t(`community.testimonials.${member.id}.role`),
              company: t(`community.testimonials.${member.id}.company`),
              quote: t(`community.testimonials.${member.id}.quote`),
              resultBadge: t(`community.testimonials.${member.id}.resultBadge`),
            }))}
            autoPlay={true}
            autoPlayDuration={7000}
          />
        </motion.div>
      </div>
    </section>
  );
}