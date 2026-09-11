import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Wrench, Code2, Zap, Users, Presentation, Network } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function Activities() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const activities = [
    { icon: Wrench, key: 'workshops' },
    { icon: Code2, key: 'coding' },
    { icon: Zap, key: 'hackathons' },
    { icon: Presentation, key: 'conferences' },
    { icon: Users, key: 'webinars' },
    { icon: Network, key: 'networking' },
  ];

  return (
    <section id="activities" ref={ref} className="relative py-24 bg-[#071A52]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {t('activities.title')}
          </h2>
          <p className="text-white/62 text-base max-w-2xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative min-h-56 border border-white/10 bg-[#0A1D5A]/55 p-7 transition-all duration-300 hover:border-[#00D4FF]/35 hover:bg-[#0B2466]/70"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center border border-[#00D4FF]/28 bg-[#00D4FF]/8 text-[#00D4FF] transition-colors duration-300 group-hover:border-[#00D4FF]/55 group-hover:bg-[#00D4FF]/12">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`activities.${activity.key}`)}
                </h3>

                <p className="text-white/58 leading-relaxed">
                  {t(`activities.${activity.key}_desc`)}
                </p>

                <div className="absolute inset-x-7 bottom-0 h-px bg-gradient-to-r from-[#00D4FF]/0 via-[#00D4FF]/45 to-[#00D4FF]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
