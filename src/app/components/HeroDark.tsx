import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Shield,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import CursorEyeMascot from './CursorEyeMascot';
import StarField from './StarField';
import LiquidOrb from './LiquidOrb';
import ataVisionLogo from '../../assets/images/ata_vision.png';
import anlbLogo from '../../assets/images/anlb.png';
import rptuLogo from '../../assets/images/rptu.png';
import mrNagueLogo from '../../assets/images/mrnague.png';

const orbitIcons = [
  { Icon: Code2, angle: -140, radius: 320, color: '#0A84FF' },
  { Icon: Cpu, angle: -90, radius: 280, color: '#A259FF' },
  { Icon: Database, angle: -50, radius: 310, color: '#00E5FF' },
  { Icon: Globe, angle: 20, radius: 320, color: '#0A84FF' },
  { Icon: Shield, angle: 90, radius: 280, color: '#A259FF' },
  { Icon: Users, angle: 160, radius: 320, color: '#00E5FF' },
];

export default function HeroDark() {
  const { t, i18n } = useTranslation();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => forceUpdate({});
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F1A]"
    >
      {/* Background StarField */}
      <StarField />

      {/* Background layers */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 65%, rgba(10, 132, 255, 0.18), transparent 70%), radial-gradient(ellipse 40% 40% at 50% 80%, rgba(162, 89, 255, 0.12), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        
        {/* Mascot (Eyes) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <CursorEyeMascot />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-center text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-white">{t('hero.title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 max-w-2xl text-center text-base leading-relaxed text-[#94A3B8] sm:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#0A84FF] px-8 text-base font-semibold text-white shadow-lg shadow-[#0A84FF]/30 transition-all hover:-translate-y-0.5 hover:bg-[#0066CC] hover:shadow-xl hover:shadow-[#0A84FF]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]"
          >
            {t('hero.cta_primary')}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        {/* Orb + Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
          className="relative mt-16 flex h-[420px] w-full max-w-3xl items-center justify-center sm:h-[480px]"
        >
          {/* Rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[420, 340, 260].map((size, i) => (
              <div
                key={size}
                className="absolute rounded-full border border-[#00E5FF]/10"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${30 + i * 10}s linear infinite`,
                }}
              />
            ))}
          </div>

          {/* Glow */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                'radial-gradient(circle, rgba(10, 132, 255, 0.35), rgba(162, 89, 255, 0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Liquid Orb (3D) */}
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <LiquidOrb />
          </div>

          {/* Floating icons */}
          {orbitIcons.map(({ Icon, angle, radius, color }, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                className="absolute"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0B0F1A]/80 shadow-lg backdrop-blur-md"
                  style={{ boxShadow: `0 0 24px ${color}40` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} aria-hidden="true" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 w-full"
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#64748B]">
            {t('hero.partners')}
          </p>
          <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
            <defs>
              <filter id="partner-remove-white" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" />
                <feComponentTransfer result="cutout">
                  <feFuncA type="linear" slope="1.05" intercept="-0.05" />
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="cutout" operator="in" />
              </filter>
              <filter id="partner-remove-dark" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  3 3 3 0 -0.8" result="cutout" />
                <feComposite in="SourceGraphic" in2="cutout" operator="in" />
              </filter>
            </defs>
          </svg>
          <div className="mx-auto grid max-w-3xl grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-10">
            <div className="flex h-20 w-full max-w-40 items-center justify-center">
              <img
                src={rptuLogo}
                alt="RPTU Kaiserslautern-Landau"
                width={474}
                height={188}
                className="h-full w-full object-contain"
                style={{ filter: 'url(#partner-remove-white) grayscale(1) invert(1)' }}
                loading="lazy"
              />
            </div>
            <div className="flex h-20 w-full max-w-40 items-center justify-center">
              <img
                src={ataVisionLogo}
                alt="ATA Vision"
                width={1280}
                height={640}
                className="h-full w-full object-contain"
                style={{ filter: 'url(#partner-remove-white)' }}
                loading="lazy"
              />
            </div>
            <div className="flex h-20 w-full max-w-40 items-center justify-center overflow-hidden">
              <img
                src={anlbLogo}
                alt="ANLB Tech"
                width={720}
                height={1080}
                className="h-32 w-[85px] shrink-0 object-contain"
                style={{ filter: 'url(#partner-remove-white)' }}
                loading="lazy"
              />
            </div>
            <div className="flex h-20 w-full max-w-40 items-center justify-center">
              <img
                src={mrNagueLogo}
                alt="Mr. Nague - Tech Thinking"
                width={1280}
                height={427}
                className="h-full w-full object-contain"
                style={{ filter: 'url(#partner-remove-dark)' }}
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}