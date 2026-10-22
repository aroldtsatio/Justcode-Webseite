import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Code, Users } from 'lucide-react';
import Hero3DBackground from './Hero3DBackground';
import HeroSplineRobot from './HeroSplineRobot';
import FuseParticle from './FuseParticle';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#FBFBF9]"
    >
      <Hero3DBackground />
      <FuseParticle intensity={0.3} speed={0.7} />
      <HeroSplineRobot />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(251,251,249,0.9),rgba(251,251,249,0.7)_40%,rgba(251,251,249,0.95)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-full bg-[linear-gradient(90deg,rgba(251,251,249,0.95)_0%,rgba(251,251,249,0.7)_40%,transparent_70%)] lg:w-[60%]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl space-y-8 text-center lg:text-left"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="inline-flex items-center space-x-2 rounded-full border border-[#0F52BA]/20 bg-white/80 px-4 py-2 backdrop-blur-sm"
          >
            <Code className="h-4 w-4 text-[#0F52BA]" aria-hidden="true" />
            <span className="text-sm font-semibold text-[#0F52BA]">
              RPTU Kaiserslautern
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold leading-[1.05] text-[#0F172A] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-[#475569] sm:text-xl lg:mx-0"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs — primary blue, secondary outlined blue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row lg:justify-start"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-[#0F52BA] px-8 text-lg font-semibold text-white shadow-xl shadow-[#0F52BA]/25 transition-all hover:bg-[#0A3D8F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F52BA] focus-visible:ring-offset-2 sm:w-auto"
            >
              <span>Discover projects</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#0F52BA] bg-white px-8 text-lg font-semibold text-[#0F52BA] transition-all hover:bg-[#0F52BA] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F52BA] focus-visible:ring-offset-2 sm:w-auto"
            >
              <Users className="h-5 w-5" aria-hidden="true" />
              <span>Join us</span>
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-4 text-sm text-[#64748B]"
          >
            ✓ Free membership · ✓ All RPTU students welcome · ✓ No prior experience needed
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden items-center gap-3 pt-6 lg:flex"
          >
            {['AI', 'Web', 'Security'].map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-[#0891B2]" aria-hidden="true" />
                <span className="text-sm font-medium text-[#475569]">{tech}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-[#0F172A]/30 p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-1.5 w-1.5 rounded-full bg-[#0F52BA]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}