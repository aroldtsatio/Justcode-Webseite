import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from 'lucide-react';
import Footer3DLogo from './Footer3DLogo';
import logoImage from '../../assets/image.png';

export default function Footer() {
  const { t } = useTranslation();
  const slogan = 'Just Code, Just Connect, Just KL';

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'activities', href: '#activities' },
    { key: 'projects', href: '#projects' },
    { key: 'team', href: '#team' },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#071A52] to-[#020B2E] border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,212,255,0.03)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="JUSTCODE-KL"
                className="h-14 w-14 flex-shrink-0 rounded-xl object-cover ring-1 ring-[#00D4FF]/35 shadow-lg shadow-[#00D4FF]/15"
              />
              <div>
                <div className="text-white font-bold text-xl leading-tight">JUSTCODE-KL</div>
                <div className="mt-1 text-[#00D4FF] text-xs font-medium leading-snug">{slogan}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.about')}
            </p>
            <div className="w-24 h-24">
              <Footer3DLogo />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#00D4FF] transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.follow_us')}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00D4FF] hover:border-[#00D4FF]/50 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#00D4FF]" />
                <div>
                  <div>{t('footer.university')}</div>
                  <div>{t('footer.address')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#00D4FF]" />
                <a href="mailto:info@justcode-kl.de" className="hover:text-[#00D4FF] transition-colors">
                  info@justcode-kl.de
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} JUSTCODE-KL. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <a href="#/privacy" className="transition hover:text-[#00D4FF]">
                {t('footer.privacy')}
              </a>
              <span aria-hidden="true">|</span>
              <span>Built with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[#00D4FF]"
              >
                ♥
              </motion.span>
              <span>by JUSTCODE-KL Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
