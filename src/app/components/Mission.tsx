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
    },
    {
      icon: Rocket,
      titleKey: 'mission.mission_title',
      descKey: 'mission.mission_desc',
    },
    {
      icon: Heart,
      titleKey: 'mission.values_title',
      descKey: 'mission.values_desc',
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
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
                  whileHover={{ y: -5 }}
                  className="relative group h-full"
                >
                  <div className="relative h-full bg-[#0A1D5A]/55 backdrop-blur-sm border border-white/10 p-8 hover:border-[#00D4FF]/35 transition-all duration-300">
                    <div className="inline-flex p-3 border border-[#00D4FF]/28 bg-[#00D4FF]/8 mb-6 text-[#00D4FF]">
                      <Icon className="w-6 h-6" strokeWidth={1.8} />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-4">
                      {t(card.titleKey)}
                    </h3>

                    <p className="text-white/62 leading-relaxed">
                      {t(card.descKey)}
                    </p>
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
