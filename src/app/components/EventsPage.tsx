import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import NavbarDark from './NavbarDark';
import Footer from './Footer';
import Events from './Events';

export default function EventsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <NavbarDark />
      <main className="relative min-h-screen pb-24 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            href="#team"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#CBD5E1] backdrop-blur transition hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('workshops.back')}
          </a>
        </div>

        <Events variant="page" />

        {/* CTA */}
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="jc-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">{t('events.cta_title')}</h2>
              <p className="text-[#94A3B8]">{t('events.cta_text')}</p>
            </div>
            <a
              href="#contact"
              className="group inline-flex min-h-[52px] flex-shrink-0 items-center gap-2 rounded-full bg-[#0A84FF] px-7 font-semibold text-white shadow-lg shadow-[#0A84FF]/30 transition hover:-translate-y-0.5 hover:bg-[#0066CC]"
            >
              {t('nav.join')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
