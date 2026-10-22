import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../../assets/image.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const slogan = 'Just Code, Just Connect, Just KL';

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#team', label: t('nav.team') },
    { href: '#contact', label: t('nav.contact') },
  ];

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

  const changeLanguage = (lang: string) => i18n.changeLanguage(lang);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#E2E8F0] bg-white/90 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex flex-shrink-0 items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
          >
            <img
              src={logoImage}
              alt="JUSTCODE-KL"
              className="h-12 w-12 flex-shrink-0 rounded-xl object-cover ring-1 ring-[#0A84FF]/20 transition group-hover:ring-[#0A84FF]/60 shadow-md"
            />
            <div className="hidden min-w-0 sm:block">
              <div className={`whitespace-nowrap text-lg font-bold leading-tight md:text-xl transition-colors ${isScrolled ? 'text-[#0B0F1A]' : 'text-white'}`}>
                JUSTCODE-KL
              </div>
              <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0A84FF] md:text-xs">
                {slogan}
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center space-x-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group relative rounded-lg px-4 py-2.5 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] ${
                  isScrolled ? 'text-[#0B0F1A]/80 hover:text-[#0A84FF]' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-[#0A84FF] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className={`hidden items-center rounded-lg border p-1 md:flex transition-colors ${
              isScrolled ? 'border-[#E2E8F0] bg-[#F8FAFC]' : 'border-white/20 bg-white/5'
            }`}>
              {(['de', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  className={`min-h-[36px] rounded-md px-3 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] ${
                    i18n.language === lang
                      ? 'bg-[#0A84FF] text-white shadow-sm'
                      : isScrolled ? 'text-[#64748B] hover:text-[#0B0F1A]' : 'text-white/60 hover:text-white'
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
              className="group hidden min-h-[44px] items-center gap-2 rounded-full bg-[#0A84FF] px-6 text-sm font-semibold text-white shadow-md shadow-[#0A84FF]/25 transition-all hover:-translate-y-0.5 hover:bg-[#0066CC] hover:shadow-lg md:inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] focus-visible:ring-offset-2"
            >
              {t('nav.join')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] lg:hidden ${
                isScrolled ? 'text-[#0B0F1A]' : 'text-white'
              }`}
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
            className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[#E2E8F0] bg-white lg:hidden"
          >
            <div className="space-y-2 px-4 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block min-h-[48px] rounded-lg px-4 py-3 text-base font-medium text-[#0B0F1A] transition hover:bg-[#F1F5F9]"
                >
                  {item.label}
                </a>
              ))}

              <div className="space-y-3 border-t border-[#E2E8F0] pt-4">
                <div className="flex items-center gap-2 rounded-lg bg-[#F8FAFC] p-1">
                  {(['de', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => changeLanguage(lang)}
                      className={`min-h-[44px] flex-1 rounded-md text-sm font-semibold transition ${
                        i18n.language === lang
                          ? 'bg-[#0A84FF] text-white'
                          : 'text-[#64748B]'
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