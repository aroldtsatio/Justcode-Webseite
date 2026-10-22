import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../../assets/image.png';

export default function NavbarDark() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, forceUpdate] = useState({}); // Force re-render on language change

  // Nav items using translation keys
  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#team', label: t('nav.team') },
    { href: '#contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    // Force re-render when language changes
    const handleLanguageChange = () => forceUpdate({});
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#0B0F1A]/90 backdrop-blur-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex flex-shrink-0 items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A]"
          >
            <img
              src={logoImage}
              alt="JUSTCODE-KL"
              className="h-10 w-10 flex-shrink-0 rounded-lg object-cover ring-1 ring-white/15 transition group-hover:ring-[#0A84FF]/60"
            />
            <span className="text-lg font-bold text-white md:text-xl">
              JUSTCODE-KL
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]"
              >
                {item.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-[#0A84FF] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="hidden items-center rounded-lg border border-white/10 bg-white/5 p-1 md:flex">
              {(['de', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => i18n.changeLanguage(lang)}
                  className={`min-h-[36px] rounded-md px-3 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] ${
                    i18n.language === lang
                      ? 'bg-[#0A84FF] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  aria-pressed={i18n.language === lang}
                  aria-label={`Switch to ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="hidden min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F1A] md:inline-flex"
            >
              {t('nav.join')}
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] lg:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-white/10 bg-[#0B0F1A] lg:hidden"
          >
            <div className="space-y-2 px-4 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block min-h-[48px] rounded-lg px-4 py-3 text-base font-medium text-white transition hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1">
                  {(['de', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => i18n.changeLanguage(lang)}
                      className={`min-h-[44px] flex-1 rounded-md text-sm font-semibold transition ${
                        i18n.language === lang
                          ? 'bg-[#0A84FF] text-white'
                          : 'text-white/60'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0A84FF] px-6 text-base font-semibold text-white"
                >
                  {t('nav.join')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}