import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Users, FolderGit2, Wrench, Calendar, Handshake } from 'lucide-react';
import { useInView } from './hooks/useInView';

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}+</span>;
}

export default function Statistics() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.3 });

  const stats = [
    { icon: Users, key: 'members', value: 250 },
    { icon: FolderGit2, key: 'projects', value: 45 },
    { icon: Wrench, key: 'workshops', value: 120 },
    { icon: Calendar, key: 'events', value: 80 },
    { icon: Handshake, key: 'partners', value: 15 },
  ];

  const ambientParticles = [
    { top: '18%', left: '9%', size: 5, drift: 24, delay: 0 },
    { top: '28%', left: '23%', size: 3, drift: -18, delay: 0.7 },
    { top: '16%', left: '46%', size: 4, drift: 20, delay: 1.2 },
    { top: '24%', left: '72%', size: 6, drift: -22, delay: 0.4 },
    { top: '38%', left: '88%', size: 3, drift: 18, delay: 1.8 },
    { top: '62%', left: '14%', size: 4, drift: -20, delay: 1.1 },
    { top: '74%', left: '34%', size: 5, drift: 22, delay: 0.3 },
    { top: '68%', left: '58%', size: 3, drift: -18, delay: 1.5 },
    { top: '78%', left: '82%', size: 4, drift: 24, delay: 0.9 },
    { top: '48%', left: '50%', size: 6, drift: -26, delay: 2.1 },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#071A52] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0F52BA]/5 rounded-full blur-3xl" />
        {ambientParticles.map((particle, index) => (
          <motion.span
            key={`${particle.top}-${particle.left}`}
            className="absolute rounded-full bg-[#00D4FF] shadow-[0_0_18px_rgba(0,212,255,0.95),0_0_42px_rgba(0,212,255,0.36)]"
            style={{
              top: particle.top,
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              isInView
                ? {
                    y: [0, -particle.drift, 0],
                    x: [0, index % 2 === 0 ? 12 : -12, 0],
                    opacity: [0.18, 0.95, 0.18],
                    scale: [0.7, 1.35, 0.7],
                  }
                : {}
            }
            transition={{
              duration: 4.8 + index * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
                className="relative group"
              >
                <div className="relative overflow-hidden bg-[#0A1D5A]/55 backdrop-blur-sm border border-white/10 p-8 hover:border-[#00D4FF]/35 transition-all duration-300">
                  <div className="absolute -inset-4 rounded-full bg-[#00D4FF]/0 blur-2xl transition duration-300 group-hover:bg-[#00D4FF]/12" />
                  <motion.div
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/70 to-transparent"
                    animate={isInView ? { opacity: [0.25, 0.9, 0.25] } : {}}
                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.18 }}
                  />
                  <motion.div
                    animate={isInView ? {
                      y: [0, -3, 0],
                    } : {}}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="w-12 h-12 mx-auto mb-4 border border-[#00D4FF]/28 bg-[#00D4FF]/8 flex items-center justify-center text-[#00D4FF]"
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </motion.div>

                  <div className="text-center">
                    <div className="text-3xl font-semibold text-white mb-2">
                      {isInView ? <AnimatedCounter end={stat.value} /> : '0+'}
                    </div>
                    <div className="text-white/60 text-sm font-medium">
                      {t(`stats.${stat.key}`)}
                    </div>
                  </div>

                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_14px_rgba(0,212,255,0.95),0_0_32px_rgba(0,212,255,0.42)]"
                      animate={isInView ? {
                        x: [0, Math.cos(i * 60 * Math.PI / 180) * (34 + index * 2)],
                        y: [0, Math.sin(i * 60 * Math.PI / 180) * (34 + index * 2)],
                        opacity: [0, 1, 0],
                        scale: [0, i % 2 === 0 ? 1.25 : 0.85, 0],
                      } : {}}
                      transition={{
                        delay: index * 0.1 + i * 0.16,
                        duration: 2.4,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: 'easeOut',
                      }}
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                    />
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
