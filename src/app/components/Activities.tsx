import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Wrench, Code2, Zap, Users, Presentation, Network } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function Activities() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const activities = [
    { icon: Wrench, key: 'workshops', gradient: 'from-purple-500 to-pink-500' },
    { icon: Code2, key: 'coding', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Zap, key: 'hackathons', gradient: 'from-yellow-500 to-orange-500' },
    { icon: Presentation, key: 'conferences', gradient: 'from-green-500 to-emerald-500' },
    { icon: Users, key: 'webinars', gradient: 'from-indigo-500 to-purple-500' },
    { icon: Network, key: 'networking', gradient: 'from-pink-500 to-rose-500' },
  ];

  return (
    <section id="activities" ref={ref} className="relative py-24 bg-[#071A52]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('activities.title')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={activity.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00D4FF]/50 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {t(`activities.${activity.key}`)}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {t(`activities.${activity.key}_desc`)}
                </p>

                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/0 to-[#00D4FF]/0 group-hover:from-[#00D4FF]/5 group-hover:to-[#0F52BA]/5 rounded-2xl transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
