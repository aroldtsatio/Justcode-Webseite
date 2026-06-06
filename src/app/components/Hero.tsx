import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Code, Rocket } from 'lucide-react';
import Hero3DBackground from './Hero3DBackground';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#071A52] via-[#0A2470] to-[#071A52]">
      <Hero3DBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071A52]/50 to-[#071A52]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full backdrop-blur-sm"
          >
            <Code className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-[#00D4FF] font-medium">RPTU Kaiserslautern</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-white/80 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0, 212, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] text-white rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg shadow-[#00D4FF]/20 transition-all"
            >
              <span>{t('hero.cta_primary')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold text-lg flex items-center space-x-2 hover:bg-white/10 transition-all"
            >
              <Rocket className="w-5 h-5" />
              <span>{t('hero.cta_secondary')}</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-16 flex items-center justify-center space-x-8"
          >
            {['AI', 'Web', 'Mobile', 'Cloud', 'Security'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
                <span className="text-white/60 text-sm">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
