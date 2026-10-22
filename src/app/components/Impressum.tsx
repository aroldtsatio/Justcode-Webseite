import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, MapPin, Scale } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from './NavbarDark'; // On utilise la Navbar du nouveau thème
import Footer from './Footer';

export default function Impressum() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F1F5F9] pt-32 pb-24 text-[#0B0F1A]">
        
        {/* Header Section */}
        <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] shadow-sm transition hover:border-[#0A84FF]/50 hover:text-[#0A84FF]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t('privacy.back_home')}
          </a>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/5 px-4 py-2 text-sm font-semibold text-[#0A84FF]">
              <Scale size={18} aria-hidden="true" />
              {t('impressum.eyebrow')}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-[#0B0F1A] sm:text-5xl lg:text-6xl">
              {t('impressum.title')}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[#475569]">
              {t('impressum.intro')}
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Provider Card */}
            <article className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-[#0B0F1A]">
                {t('impressum.provider_title')}
              </h2>
              <div className="space-y-3 text-base leading-relaxed text-[#475569]">
                <p className="font-bold text-[#0B0F1A]">JUSTCODE-KL</p>
                <p>RPTU Kaiserslautern-Landau</p>
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#0A84FF]" aria-hidden="true" />
                  <span>Gottlieb-Daimler-Strasse, 67663 Kaiserslautern, Deutschland</span>
                </div>
              </div>
            </article>

            {/* Contact Card */}
            <article className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-[#0B0F1A]">
                {t('impressum.contact_title')}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-[#475569]">
                {t('impressum.contact_text')}
              </p>
              <a
                href="mailto:info@justcode-kl.de"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A84FF] px-6 text-base font-semibold text-white shadow-md shadow-[#0A84FF]/20 transition hover:bg-[#0066CC] hover:shadow-lg"
              >
                <Mail size={18} aria-hidden="true" />
                info@justcode-kl.de
              </a>
            </article>

            {/* Note Card (Full width) */}
            <article className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:col-span-2">
              <h2 className="mb-4 text-xl font-bold text-[#0B0F1A]">
                {t('impressum.note_title')}
              </h2>
              <p className="text-base leading-relaxed text-[#475569]">
                {t('impressum.note_text')}
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}