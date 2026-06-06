import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Brain, Shield, Globe, Smartphone, Cloud, Cpu, GitBranch, Code } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function TechDomains() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const domains = [
    { icon: Brain, key: 'ai', color: '#FF6B6B', delay: 0 },
    { icon: Shield, key: 'security', color: '#4ECDC4', delay: 0.1 },
    { icon: Globe, key: 'web', color: '#45B7D1', delay: 0.2 },
    { icon: Smartphone, key: 'mobile', color: '#96CEB4', delay: 0.3 },
    { icon: Cloud, key: 'cloud', color: '#FFEAA7', delay: 0.4 },
    { icon: Cpu, key: 'robotics', color: '#DFE6E9', delay: 0.5 },
    { icon: GitBranch, key: 'devops', color: '#74B9FF', delay: 0.6 },
    { icon: Code, key: 'opensource', color: '#A29BFE', delay: 0.7 },
  ];

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-[#0A2470] to-[#071A52] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#00D4FF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#0F52BA]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('domains.title')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('domains.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <motion.div
                key={domain.key}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: domain.delay, duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  whileHover={{
                    y: -15,
                    rotateY: 5,
                    scale: 1.05,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute -inset-1 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"
                  />

                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D4FF]/50 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0F52BA] to-[#00D4FF] flex items-center justify-center"
                        style={{
                          boxShadow: `0 10px 40px ${domain.color}40`,
                        }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white">
                        {t(`domains.${domain.key}`)}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed">
                        {t(`domains.${domain.key}_desc`)}
                      </p>
                    </div>

                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00D4FF]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
