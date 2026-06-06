import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Target, Rocket, Heart } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function Mission() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const cards = [
    {
      icon: Target,
      titleKey: 'mission.vision_title',
      descKey: 'mission.vision_desc',
      gradient: 'from-[#0F52BA] to-[#00D4FF]',
    },
    {
      icon: Rocket,
      titleKey: 'mission.mission_title',
      descKey: 'mission.mission_desc',
      gradient: 'from-[#00D4FF] to-[#0F52BA]',
    },
    {
      icon: Heart,
      titleKey: 'mission.values_title',
      descKey: 'mission.values_desc',
      gradient: 'from-[#0F52BA] via-[#00D4FF] to-[#0F52BA]',
    },
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 bg-gradient-to-b from-[#071A52] to-[#0A2470] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('mission.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.titleKey}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                       style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

                  <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00D4FF]/50 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.gradient} mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {t(card.titleKey)}
                    </h3>

                    <p className="text-white/70 leading-relaxed">
                      {t(card.descKey)}
                    </p>

                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-full blur-2xl" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
