import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, ArrowRight } from 'lucide-react';
import Footer3DLogo from './Footer3DLogo';
import FuseParticle from './FuseParticle';
import logoImage from '../../assets/image.png';

export default function Footer() {
  const { t } = useTranslation();
  const slogan = 'Just Code, Just Connect, Just KL';
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'What we do' },
    { href: '#projects', label: 'Projects' },
    { href: '#team', label: 'Community' },
    { href: '#contact', label: 'Join' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  // Easter egg logic
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 },
        colors: ['#0A84FF', '#A259FF', '#00E5FF', '#FFFFFF'],
      });
      
      // Show secret message
      setShowSecret(true);
      
      // Reset after 4 seconds
      setTimeout(() => {
        setShowSecret(false);
        setClickCount(0);
      }, 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B0F1A]">
      {/* Smooth transition from the previous light section */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F1F5F9] to-transparent" />

      {/* Subtle background particles */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <FuseParticle intensity={0.15} speed={0.3} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT: 3 columns of content */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:col-span-9">
            {/* Brand column */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={logoImage}
                  alt="JUSTCODE-KL"
                  className="h-14 w-14 flex-shrink-0 rounded-xl object-cover shadow-md ring-1 ring-[#0A84FF]/30"
                />
                <div>
                  <div className="text-xl font-bold leading-tight text-white">
                    JUSTCODE-KL
                  </div>
                  <div className="mt-1 text-xs font-medium leading-snug text-[#0A84FF]">
                    {slogan}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[#94A3B8]">
                {t('footer.about')}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                {t('footer.quick_links')}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-[#94A3B8] transition-colors hover:text-[#0A84FF]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">
                {t('footer.contact')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0A84FF]" aria-hidden="true" />
                  <div>
                    <div>{t('footer.university')}</div>
                    <div>{t('footer.address')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <Mail className="h-5 w-5 flex-shrink-0 text-[#0A84FF]" aria-hidden="true" />
                  <a
                    href="mailto:info@justcode-kl.de"
                    className="transition-colors hover:text-[#0A84FF]"
                  >
                    info@justcode-kl.de
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D logo + social */}
          <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {/* Rotating 3D logo with click handler */}
            <div className="relative flex flex-col items-center">
              <div 
                className="h-32 w-32 cursor-pointer"
                onClick={handleLogoClick}
                title="Click me!"
              >
                <Footer3DLogo />
              </div>
              <p className="mt-2 text-center text-xs font-medium text-[#64748B]">
                Just KL
              </p>

              {/* Secret message */}
              {showSecret && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#0A84FF] to-[#A259FF] px-4 py-2 text-sm font-bold text-white shadow-lg"
                >
                  🎉 You found the secret! Just Code, Just Connect! 🎉
                </motion.div>
              )}
            </div>

            {/* Social icons */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                {t('footer.follow_us')}
              </h3>
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#94A3B8] transition-all hover:border-[#0A84FF] hover:bg-[#0A84FF] hover:text-white"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* MASSIVE CTA SECTION */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A84FF]/10 to-[#A259FF]/10 p-8 sm:p-12">
          <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Ready to start your journey?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-[#94A3B8]">
                Join 250+ students building the future of tech at RPTU. Your first project is one click away.
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(10, 132, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex min-h-[64px] flex-shrink-0 items-center gap-3 rounded-2xl bg-[#0A84FF] px-10 text-lg font-bold text-white shadow-xl shadow-[#0A84FF]/30 transition-all hover:bg-[#0066CC]"
            >
              Become a member
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[#64748B]">
              © {new Date().getFullYear()} JUSTCODE-KL. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <a href="#/privacy" className="transition hover:text-[#0A84FF]">
                {t('footer.privacy')}
              </a>
              <span aria-hidden="true">|</span>
              <a href="#/impressum" className="transition hover:text-[#0A84FF]">
                {t('footer.impressum')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}