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
    { icon: Users, key: 'members', value: 250, color: '#00D4FF' },
    { icon: FolderGit2, key: 'projects', value: 45, color: '#0F52BA' },
    { icon: Wrench, key: 'workshops', value: 120, color: '#00D4FF' },
    { icon: Calendar, key: 'events', value: 80, color: '#0F52BA' },
    { icon: Handshake, key: 'partners', value: 15, color: '#00D4FF' },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-[#071A52] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0F52BA]/5 rounded-full blur-3xl" />
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
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00D4FF]/50 transition-all duration-300">
                  <motion.div
                    animate={isInView ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#0F52BA] to-[#00D4FF] flex items-center justify-center"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {isInView ? <AnimatedCounter end={stat.value} /> : '0+'}
                    </div>
                    <div className="text-white/60 text-sm font-medium">
                      {t(`stats.${stat.key}`)}
                    </div>
                  </div>

                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00D4FF] rounded-full"
                      animate={isInView ? {
                        x: [0, Math.cos(i * 120 * Math.PI / 180) * 40],
                        y: [0, Math.sin(i * 120 * Math.PI / 180) * 40],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      } : {}}
                      transition={{
                        delay: index * 0.1 + i * 0.3,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
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
