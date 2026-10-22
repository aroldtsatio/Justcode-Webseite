import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, FolderGit2, Wrench, Calendar, ShieldCheck } from 'lucide-react';
import { useInView } from './hooks/useInView';
import ArcDialTestimonial, { Testimonial } from './ArcDialTestimonial';
import InteractiveParticles from './InteractiveParticles'; // <-- Particules interactives
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
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'B.Sc. Computer Science',
    company: '4th semester',
    initials: 'SM',
    avatar: images.itachi,
    quote:
      'JUSTCODE-KL helped me move from theory to practice. The workshops are pure gold — I built my first real project in three weeks and finally understood what I was learning in class.',
    rating: 5,
    resultBadge: 'First project shipped',
    verified: true,
  },
  {
    id: '2',
    name: 'David K.',
    role: 'M.Sc. Artificial Intelligence',
    company: 'Alumnus',
    initials: 'DK',
    avatar: undefined,
    quote:
      'Thanks to the career program, I landed my dream internship at SAP. The mock interviews were brutally honest, and that is exactly what I needed.',
    rating: 5,
    resultBadge: 'Hired at SAP',
    verified: true,
  },
  {
    id: '3',
    name: 'Lea B.',
    role: 'B.Sc. Computer Science',
    company: '2nd semester',
    initials: 'LB',
    avatar: undefined,
    quote:
      'As a beginner I felt welcome right away. The community is incredibly supportive, and within my first month I had joined a project team.',
    rating: 5,
    resultBadge: 'From beginner to contributor',
    verified: true,
  },
  {
    id: '4',
    name: 'Tom R.',
    role: 'M.Sc. Cybersecurity',
    company: '3rd semester',
    initials: 'TR',
    avatar: undefined,
    quote:
      'The hackathons showed me what I am really capable of. 24 hours, a team of strangers, and we won second place. That weekend taught me more than a full semester.',
    rating: 5,
    resultBadge: '2nd place · Hackathon 2025',
    verified: true,
  },
  {
    id: '5',
    name: 'Anna P.',
    role: 'B.Sc. Computer Science',
    company: '6th semester',
    initials: 'AP',
    avatar: undefined,
    quote:
      'My GitHub portfolio looks impressive thanks to the project workshops. I went from zero public repos to seven shipped projects in one semester.',
    rating: 5,
    resultBadge: '7 projects shipped',
    verified: true,
  },
];

function StatCard({ stat, index, isInView }: { stat: typeof stats[0], index: number, isInView: boolean }) {
  const Icon = stat.icon;
  const { count, progress } = AnimatedCounter({ end: stat.value, isInView });
  
  const percentage = Math.min((count / stat.max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white/80 p-6 text-center shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div 
        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform"
        style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      
      <div className="text-3xl font-bold text-[#0B0F1A] sm:text-4xl">
        {count}<span className="text-xl">+</span>
      </div>
      
      <div className="mt-1 text-sm font-medium uppercase tracking-wider text-[#64748B]">
        {stat.key}
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: stat.color }}
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
    <section id="team" ref={ref} className="relative overflow-hidden bg-[#F1F5F9] py-24">
      {/* Smooth transition from the dark Projects section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#0B0F1A] to-transparent" />
      
      {/* Interactive Particles Background */}
      <InteractiveParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-[#00E5FF]/40 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B0F1A]">
              {t('community.eyebrow')}
            </span>
          </div>
          <h2 className="mb-12 text-3xl font-bold text-[#0B0F1A] sm:text-4xl md:text-5xl">
            {t('community.stats_title')}
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.key} stat={stat} index={index} isInView={isInView} />
            ))}
          </div>

          {/* Trust Bar */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-[#E2E8F0] pt-8 opacity-70 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3 text-sm font-medium text-[#475569]">
              <ShieldCheck className="h-5 w-5 text-[#0A84FF]" />
              <span>Official Student Initiative</span>
            </div>
            <div className="hidden h-4 w-px bg-[#CBD5E1] sm:block" />
            <div className="flex items-center gap-3">
               <span className="text-sm text-[#64748B]">Hosted at</span>
               <span className="text-base font-bold text-[#0B0F1A]">RPTU Kaiserslautern</span>
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
            <h2 className="mb-4 text-3xl font-bold text-[#0B0F1A] sm:text-4xl">
              {t('community.testimonials_title')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[#475569]">
              {t('community.testimonials_subtitle')}
            </p>
          </div>

          <ArcDialTestimonial
            testimonials={testimonials}
            autoPlay={true}
            autoPlayDuration={7000}
          />
        </motion.div>
      </div>
    </section>
  );
}