import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';

type PolicySection = {
  title: string;
  paragraphs: string[];
};

const updatedAt = '7 October 2026';

const policyContent: Record<'de' | 'en', { eyebrow: string; title: string; intro: string; sections: PolicySection[] }> = {
  de: {
    eyebrow: 'Datenschutz',
    title: 'Datenschutzerklaerung',
    intro:
      'Diese Datenschutzerklaerung informiert darueber, wie JUSTCODE-KL personenbezogene Daten auf dieser Website verarbeitet. Sie orientiert sich an den Informationspflichten der DSGVO und den Anforderungen des TDDDG fuer Cookies und aehnliche Technologien in Deutschland.',
    sections: [
      {
        title: '1. Verantwortlicher',
        paragraphs: [
          'JUSTCODE-KL, RPTU Kaiserslautern-Landau, Gottlieb-Daimler-Strasse, 67663 Kaiserslautern, Deutschland.',
          'Kontakt: info@justcode-kl.de',
        ],
      },
      {
        title: '2. Besuch dieser Website',
        paragraphs: [
          'Beim Aufruf der Website koennen technisch notwendige Zugriffsdaten verarbeitet werden, zum Beispiel IP-Adresse, Datum und Uhrzeit der Anfrage, Browserinformationen, Betriebssystem, Referrer-URL und angeforderte Dateien.',
          'Die Verarbeitung erfolgt, um die Website sicher, stabil und korrekt auszuliefern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im Betrieb und in der Absicherung dieser Website.',
        ],
      },
      {
        title: '3. Kontaktaufnahme',
        paragraphs: [
          'Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern es um eine Mitgliedschaft oder vorvertragliche Kommunikation geht, ansonsten Art. 6 Abs. 1 lit. f DSGVO.',
          'Das Mitgliedschaftsformular dieser Website wird derzeit nur im Browser verarbeitet und sendet im aktuellen technischen Stand keine Daten an einen Server. Wird spaeter ein Versand oder eine Speicherung angebunden, muss diese Datenschutzerklaerung entsprechend aktualisiert werden.',
        ],
      },
      {
        title: '4. Cookies und Consent',
        paragraphs: [
          'Notwendige Speichertechniken werden eingesetzt, damit Grundfunktionen wie Spracheinstellungen und die Speicherung deiner Cookie-Auswahl funktionieren.',
          'Optionale Statistik- oder Marketing-Technologien werden erst aktiviert, wenn du ausdruecklich zustimmst. Du kannst deine Entscheidung jederzeit ueber das Cookie-Symbol unten links auf der Website aendern.',
        ],
      },
      {
        title: '5. Empfaenger und Drittanbieter',
        paragraphs: [
          'Wir geben personenbezogene Daten nicht zu Werbezwecken weiter. Fuer den technischen Betrieb koennen Hosting- und Infrastruktur-Dienstleister eingesetzt werden, die Daten nur nach Weisung und im erforderlichen Umfang verarbeiten.',
          'Externe Dienste fuer Statistik, Marketing oder eingebettete Inhalte duerfen erst geladen werden, wenn dafuer eine passende Rechtsgrundlage besteht und, soweit erforderlich, deine Einwilligung vorliegt.',
        ],
      },
      {
        title: '6. Speicherdauer',
        paragraphs: [
          'Wir speichern personenbezogene Daten nur so lange, wie es fuer den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.',
          'Consent-Einstellungen werden lokal in deinem Browser gespeichert, bis du sie loeschst oder die Website eine neue Einwilligungsversion anfordert.',
        ],
      },
      {
        title: '7. Deine Rechte',
        paragraphs: [
          'Du hast nach der DSGVO das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Datenuebertragbarkeit und Widerspruch gegen bestimmte Verarbeitungen.',
          'Wenn eine Verarbeitung auf Einwilligung beruht, kannst du diese Einwilligung jederzeit mit Wirkung fuer die Zukunft widerrufen. Du hast ausserdem das Recht, dich bei einer Datenschutzaufsichtsbehoerde zu beschweren.',
        ],
      },
      {
        title: '8. Aktualisierung',
        paragraphs: [
          'Diese Datenschutzerklaerung wird angepasst, wenn sich Funktionen, Dienste oder rechtliche Anforderungen aendern.',
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    intro:
      'This privacy policy explains how JUSTCODE-KL processes personal data on this website. It follows the transparency duties under the GDPR and the German TDDDG requirements for cookies and similar technologies.',
    sections: [
      {
        title: '1. Controller',
        paragraphs: [
          'JUSTCODE-KL, RPTU Kaiserslautern-Landau, Gottlieb-Daimler-Strasse, 67663 Kaiserslautern, Germany.',
          'Contact: info@justcode-kl.de',
        ],
      },
      {
        title: '2. Website Visits',
        paragraphs: [
          'When you access this website, technically necessary access data may be processed, such as IP address, request date and time, browser information, operating system, referrer URL, and requested files.',
          'This processing keeps the website secure, stable, and correctly delivered. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is operating and protecting this website.',
        ],
      },
      {
        title: '3. Contact',
        paragraphs: [
          'If you contact us by email, we process your information to handle your request. The legal basis is Art. 6(1)(b) GDPR where the request concerns membership or pre-contractual communication; otherwise Art. 6(1)(f) GDPR applies.',
          'The membership form on this website is currently processed only in the browser and, in the current technical implementation, does not send data to a server. If submission or storage is connected later, this policy must be updated accordingly.',
        ],
      },
      {
        title: '4. Cookies and Consent',
        paragraphs: [
          'Necessary storage technologies are used for core functions such as language settings and saving your cookie choice.',
          'Optional statistics or marketing technologies are activated only after your explicit consent. You can change your decision at any time using the cookie icon at the bottom left of the website.',
        ],
      },
      {
        title: '5. Recipients and Third Parties',
        paragraphs: [
          'We do not share personal data for advertising purposes. Hosting and infrastructure providers may process data for technical operation, only as instructed and only to the required extent.',
          'External services for statistics, marketing, or embedded content may be loaded only where an appropriate legal basis exists and, where required, your consent has been obtained.',
        ],
      },
      {
        title: '6. Retention',
        paragraphs: [
          'We store personal data only for as long as required for the relevant purpose or legal retention duties.',
          'Consent settings are stored locally in your browser until you delete them or the website requests a new consent version.',
        ],
      },
      {
        title: '7. Your Rights',
        paragraphs: [
          'Under the GDPR, you have the right of access, rectification, erasure, restriction of processing, data portability, and objection to certain processing activities.',
          'Where processing is based on consent, you may withdraw that consent at any time with future effect. You also have the right to lodge a complaint with a data protection supervisory authority.',
        ],
      },
      {
        title: '8. Updates',
        paragraphs: ['This privacy policy will be updated when website features, services, or legal requirements change.'],
      },
    ],
  },
};

export default function PrivacyPolicy() {
  const { i18n, t } = useTranslation();
  const content = policyContent[i18n.language === 'en' ? 'en' : 'de'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#071A52] pt-28 text-white">
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#071A52] via-[#0A2470] to-[#071A52] px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,212,255,0.18),transparent_34%)]" />
          <div className="relative mx-auto max-w-5xl">
            <a
              href="#home"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-[#00D4FF]/50 hover:text-[#00D4FF]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('privacy.back_home')}
            </a>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 text-sm font-semibold text-[#00D4FF]">
                <ShieldCheck size={18} aria-hidden="true" />
                {content.eyebrow}
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">{content.intro}</p>
              <p className="mt-5 text-sm text-white/50">
                {t('privacy.updated')} {updatedAt}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-5">
              {content.sections.map((section) => (
                <article key={section.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  <div className="mt-4 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-white/70">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-[#00D4FF]/25 bg-[#00D4FF]/10 p-5">
              <h2 className="text-base font-semibold text-white">{t('privacy.contact_title')}</h2>
              <p className="mt-3 text-sm leading-6 text-white/68">{t('privacy.contact_text')}</p>
              <a
                href="mailto:info@justcode-kl.de"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#00D4FF] px-4 text-sm font-semibold text-[#071A52] transition hover:bg-white"
              >
                <Mail size={16} aria-hidden="true" />
                info@justcode-kl.de
              </a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
