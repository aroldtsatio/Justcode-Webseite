import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Brain, Shield, Globe, Smartphone, Cloud, Cpu, GitBranch, Code } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function TechDomains() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const domains = [
    { icon: Brain, key: 'ai', delay: 0 },
    { icon: Shield, key: 'security', delay: 0.05 },
    { icon: Globe, key: 'web', delay: 0.1 },
    { icon: Smartphone, key: 'mobile', delay: 0.15 },
    { icon: Cloud, key: 'cloud', delay: 0.2 },
    { icon: Cpu, key: 'robotics', delay: 0.25 },
    { icon: GitBranch, key: 'devops', delay: 0.3 },
    { icon: Code, key: 'opensource', delay: 0.35 },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-[#0A2470] to-[#071A52] overflow-hidden">
      <div className="absolute inset-0 opacity-35">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {t('domains.title')}
          </h2>
          <p className="text-white/62 text-base max-w-2xl mx-auto">
            {t('domains.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((domain, index) => {
            const Icon = domain.icon;

            return (
              <motion.div
                key={domain.key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: domain.delay, duration: 0.5 }}
              >
                <motion.div
                  animate={isInView ? { y: [0, index % 2 === 0 ? -4 : 4, 0] } : {}}
                  transition={{ duration: 5 + index * 0.2, repeat: Infinity, ease: 'easeInOut', delay: domain.delay }}
                  whileHover={{
                    y: -6,
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative h-full border border-white/10 bg-[#0A1D5A]/55 p-6 transition-all duration-300 hover:border-[#00D4FF]/35 hover:bg-[#0B2466]/70">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div
                        whileHover={{ y: -2 }}
                        className="w-12 h-12 border border-[#00D4FF]/28 bg-[#00D4FF]/8 flex items-center justify-center text-[#00D4FF]"
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </motion.div>

                      <h3 className="text-lg font-semibold text-white">
                        {t(`domains.${domain.key}`)}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed">
                        {t(`domains.${domain.key}_desc`)}
                      </p>
                    </div>

                    <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
