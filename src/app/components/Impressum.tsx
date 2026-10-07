import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, MapPin, Scale } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Impressum() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#071A52] pt-28 text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#071A52] via-[#0A2470] to-[#071A52] px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(0,212,255,0.18),transparent_34%)]" />
          <div className="relative mx-auto max-w-5xl">
            <a
              href="#home"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('privacy.back_home')}
            </a>
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-sm font-semibold text-[#00D4FF]">
              <Scale size={18} aria-hidden="true" />
              {t('impressum.eyebrow')}
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {t('impressum.title')}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
              {t('impressum.intro')}
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">{t('impressum.provider_title')}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                <p>JUSTCODE-KL</p>
                <p>RPTU Kaiserslautern-Landau</p>
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#00D4FF]" aria-hidden="true" />
                  <span>Gottlieb-Daimler-Strasse, 67663 Kaiserslautern, Deutschland</span>
                </p>
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-xl font-semibold text-white">{t('impressum.contact_title')}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{t('impressum.contact_text')}</p>
              <a
                href="mailto:info@justcode-kl.de"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00D4FF] px-4 text-sm font-semibold text-[#071A52] transition hover:bg-white"
              >
                <Mail size={16} aria-hidden="true" />
                info@justcode-kl.de
              </a>
            </article>

            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-white">{t('impressum.note_title')}</h2>
              <p className="mt-4 text-sm leading-7 text-white/70">{t('impressum.note_text')}</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
