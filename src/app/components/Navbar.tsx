import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'activities', href: '#activities' },
    { key: 'talks', href: '#talks' },
    { key: 'projects', href: '#projects' },
    { key: 'resources', href: '#resources' },
    { key: 'career', href: '#career' },
    { key: 'team', href: '#team' },
    { key: 'contact', href: '#contact' },
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071A52]/80 backdrop-blur-lg border-b border-[#00D4FF]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0F52BA] to-[#00D4FF] flex items-center justify-center">
              <span className="text-white font-bold text-xl">JC</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-xl">JUSTCODE-KL</div>
              <div className="text-[#00D4FF] text-xs">Learning by Doing</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 text-white/80 hover:text-white transition-colors relative group"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00D4FF] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Language Selector & CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
              <button
                onClick={() => changeLanguage('de')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  i18n.language === 'de'
                    ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                DE
              </button>
              <div className="w-px h-4 bg-white/20" />
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  i18n.language === 'en'
                    ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#00D4FF]/20 transition-all"
            >
              {t('nav.join')}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#071A52]/95 backdrop-blur-lg border-t border-[#00D4FF]/20"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-center space-x-2 bg-white/5 rounded-lg px-3 py-2">
                  <button
                    onClick={() => changeLanguage('de')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all flex-1 ${
                      i18n.language === 'de'
                        ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                        : 'text-white/60'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-all flex-1 ${
                      i18n.language === 'en'
                        ? 'text-[#00D4FF] bg-[#00D4FF]/10'
                        : 'text-white/60'
                    }`}
                  >
                    EN
                  </button>
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] text-white rounded-lg font-medium">
                  {t('nav.join')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
