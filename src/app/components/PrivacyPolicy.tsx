import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from './NavbarDark'; // On utilise la Navbar du nouveau thème
import Footer from './Footer';

type PolicySection = {
  title: string;
  paragraphs: string[];
};

const updatedAt = new Date(Date.UTC(2026, 9, 19));

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
          'Wenn du das Mitgliedschaftsformular absendest, werden Name, E-Mail-Adresse, Studiengang, Semester und Interessen an unsere Serverfunktion bei Vercel uebermittelt und in einer PostgreSQL-Datenbank bei Neon zur Bearbeitung deines Antrags gespeichert. Antraege werden nicht automatisch angenommen. Zur Begrenzung wiederholter Anfragen wird ausserdem ein mit einem geheimen Schluessel abgeleiteter IP-Pruefwert fuer 15 Minuten verwendet. Abgelaufene Pruefwerte werden bei nachfolgenden Anfragen bereinigt.',
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
          'Die Startseite bindet ein interaktives 3D-Robotermodell von Spline ueber my.spline.design ein. Beim Laden dieses Inhalts koennen technische Daten wie IP-Adresse, Browserinformationen, Referrer und Nutzungsdaten an Spline bzw. dessen Infrastruktur uebermittelt werden.',
          'Weitere externe Dienste fuer Statistik, Marketing oder eingebettete Inhalte duerfen erst geladen werden, wenn dafuer eine passende Rechtsgrundlage besteht und, soweit erforderlich, deine Einwilligung vorliegt.',
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
          'When you submit the membership form, your name, email address, major, semester and interests are sent to our server function on Vercel and stored in a PostgreSQL database on Neon to process your application. Applications are not automatically approved. To limit repeated requests, an IP-derived value created with a secret key is also used for 15 minutes. Expired values are cleaned up on subsequent requests.',
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
          'The homepage embeds an interactive 3D robot model from Spline via my.spline.design. When this content loads, technical data such as IP address, browser information, referrer, and usage data may be transmitted to Spline or its infrastructure.',
          'Additional external services for statistics, marketing, or embedded content may be loaded only where an appropriate legal basis exists and, where required, your consent has been obtained.',
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
              <ShieldCheck size={18} aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h1 className="mb-6 text-4xl font-bold text-[#0B0F1A] sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-[#475569]">
              {content.intro}
            </p>
            <p className="mt-6 text-sm text-[#64748B]">
              {t('privacy.updated')} {new Intl.DateTimeFormat(i18n.resolvedLanguage, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(updatedAt)}
            </p>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
            
            {/* Left column: Sections */}
            <div className="space-y-6">
              {content.sections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="mb-4 text-xl font-bold text-[#0B0F1A]">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-[#475569]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Right column: Contact Card */}
            <aside className="h-fit lg:sticky lg:top-32">
              <div className="rounded-2xl border border-[#0A84FF]/20 bg-[#0A84FF]/5 p-6">
                <h2 className="mb-3 text-lg font-bold text-[#0B0F1A]">
                  {t('privacy.contact_title')}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-[#475569]">
                  {t('privacy.contact_text')}
                </p>
                <a
                  href="mailto:info@justcode-kl.de"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A84FF] px-4 text-sm font-semibold text-white shadow-md shadow-[#0A84FF]/20 transition hover:bg-[#0066CC] hover:shadow-lg"
                >
                  <Mail size={16} aria-hidden="true" />
                  info@justcode-kl.de
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}