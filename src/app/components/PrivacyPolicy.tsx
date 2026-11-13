import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from './NavbarDark'; // On utilise la Navbar du nouveau thème
import Footer from './Footer';

type PolicySection = {
  title: string;
  paragraphs: string[];
};

const updatedAt = new Date(Date.UTC(2026, 10, 13));

const policyContent: Record<'de' | 'en', { eyebrow: string; title: string; intro: string; sections: PolicySection[] }> = {
  de: {
    eyebrow: "Datenschutz",
    title: "Datenschutzerklärung",
    intro: "Diese Datenschutzerklärung informiert darüber, wie JUSTCODE-KL personenbezogene Daten auf dieser Website verarbeitet. Sie orientiert sich an den Informationspflichten der DSGVO und den Anforderungen des TDDDG.",
    sections: [
      {
        title: "1. Verantwortlicher",
        paragraphs: [
          "JUSTCODE-KL, Hochschulgruppe an der RPTU Kaiserslautern-Landau, vertreten durch Yann Lemogoun (Präsident), c/o RPTU Kaiserslautern-Landau, Gottlieb-Daimler-Straße 47, 67663 Kaiserslautern, Deutschland.",
          "E-Mail: yannlemogoun@gmail.com",
        ],
      },
      {
        title: "2. Hosting und Besuch dieser Website",
        paragraphs: [
          "Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Beim Aufruf verarbeitet Vercel technisch notwendige Zugriffsdaten, zum Beispiel IP-Adresse, Datum und Uhrzeit der Anfrage, Browser- und Betriebssysteminformationen, Referrer-URL und angeforderte Dateien. Diese Daten werden nur kurzzeitig in Server-Logs gespeichert.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung der Website. Eine Übermittlung in die USA kann stattfinden; Vercel ist unter dem EU-US Data Privacy Framework zertifiziert und setzt zusätzlich EU-Standardvertragsklauseln ein.",
          "Schriftarten werden direkt von diesem Server geladen. Es werden keine Google Fonts oder andere externe Schriftdienste eingebunden.",
        ],
      },
      {
        title: "3. Mitgliedschaftsformular und Kontakt per E-Mail",
        paragraphs: [
          "Das Mitgliedschaftsformular speichert und versendet selbst keine Daten. Beim Absenden öffnet sich lediglich ein vorausgefüllter E-Mail-Entwurf in Gmail (bzw. deinem E-Mail-Programm). Erst wenn du diese E-Mail selbst abschickst, erhalten wir Name, E-Mail-Adresse, Studiengang, Semester und Interessen.",
          "Für das Versenden über Gmail gelten die Datenschutzbestimmungen von Google. Unser Postfach wird ebenfalls bei Google (Gmail) betrieben.",
          "Wir verarbeiten deine Angaben ausschließlich zur Bearbeitung deiner Mitgliedschaftsanfrage bzw. deiner Nachricht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung der Mitgliedschaft), ansonsten Art. 6 Abs. 1 lit. f DSGVO.",
        ],
      },
      {
        title: "4. Lokale Speicherung und Cookies",
        paragraphs: [
          "Wir setzen keine Tracking- oder Marketing-Cookies ein. Im lokalen Speicher deines Browsers werden lediglich deine Sprachauswahl und deine Cookie-Einstellung gespeichert, damit diese Grundfunktionen funktionieren (§ 25 Abs. 2 Nr. 2 TDDDG).",
          "Du kannst deine Entscheidung jederzeit über das Cookie-Symbol auf der Website ändern oder die Daten in deinem Browser löschen.",
        ],
      },
      {
        title: "5. Externe Links",
        paragraphs: [
          "Diese Website enthält Links zu LinkedIn, GitLab (RPTU) und weiteren Seiten. Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Anbieter übertragen; dort gelten dessen Datenschutzbestimmungen. Inhalte dieser Anbieter werden nicht automatisch eingebettet.",
        ],
      },
      {
        title: "6. Speicherdauer",
        paragraphs: [
          "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist. E-Mails zu Mitgliedschaftsanfragen löschen wir, wenn sie nicht mehr benötigt werden, spätestens nach Ende der Mitgliedschaft bzw. nach Abschluss der Anfrage.",
        ],
      },
      {
        title: "7. Deine Rechte",
        paragraphs: [
          "Du hast nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Schreibe uns dazu einfach eine E-Mail.",
          "Du hast außerdem das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, zum Beispiel beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.",
        ],
      },
      {
        title: "8. Aktualisierung",
        paragraphs: [
          "Diese Datenschutzerklärung wird angepasst, wenn sich Funktionen, Dienste oder rechtliche Anforderungen ändern.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    intro: "This privacy policy explains how JUSTCODE-KL processes personal data on this website. It follows the transparency duties under the GDPR and the German TDDDG.",
    sections: [
      {
        title: "1. Controller",
        paragraphs: [
          "JUSTCODE-KL, student group at RPTU Kaiserslautern-Landau, represented by Yann Lemogoun (President), c/o RPTU Kaiserslautern-Landau, Gottlieb-Daimler-Straße 47, 67663 Kaiserslautern, Germany.",
          "Email: yannlemogoun@gmail.com",
        ],
      },
      {
        title: "2. Hosting and website visits",
        paragraphs: [
          "This website is hosted by Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). When you visit it, Vercel processes technically necessary access data such as IP address, request date and time, browser and operating system information, referrer URL and requested files. This data is kept only briefly in server logs.",
          "The legal basis is Art. 6(1)(f) GDPR; our legitimate interest is delivering the website securely and reliably. Data may be transferred to the USA; Vercel is certified under the EU-US Data Privacy Framework and additionally uses EU Standard Contractual Clauses.",
          "Fonts are served directly from this server. No Google Fonts or other external font services are used.",
        ],
      },
      {
        title: "3. Membership form and email contact",
        paragraphs: [
          "The membership form does not store or send any data itself. Submitting it only opens a pre-filled email draft in Gmail (or your email app). We receive your name, email address, major, semester and interests only once you send that email yourself.",
          "Sending via Gmail is subject to Google's privacy policy. Our mailbox is also hosted by Google (Gmail).",
          "We process your information solely to handle your membership request or message. The legal basis is Art. 6(1)(b) GDPR (steps prior to membership), otherwise Art. 6(1)(f) GDPR.",
        ],
      },
      {
        title: "4. Local storage and cookies",
        paragraphs: [
          "We do not use tracking or marketing cookies. Only your language choice and your cookie setting are kept in your browser's local storage so these basic functions work (§ 25(2) no. 2 TDDDG).",
          "You can change your choice at any time via the cookie icon on the website or delete this data in your browser.",
        ],
      },
      {
        title: "5. External links",
        paragraphs: [
          "This website links to LinkedIn, GitLab (RPTU) and other sites. Data is transferred to these providers only when you click a link; their privacy policies then apply. Their content is not embedded automatically.",
        ],
      },
      {
        title: "6. Retention",
        paragraphs: [
          "We keep personal data only as long as needed for the respective purpose. Emails about membership requests are deleted once no longer needed, at the latest after the membership ends or the request is closed.",
        ],
      },
      {
        title: "7. Your rights",
        paragraphs: [
          "Under the GDPR you have the right of access, rectification, erasure, restriction of processing, data portability and objection. Just send us an email.",
          "You also have the right to lodge a complaint with a data protection supervisory authority, for example the State Commissioner for Data Protection and Freedom of Information of Rhineland-Palatinate.",
        ],
      },
      {
        title: "8. Updates",
        paragraphs: [
          "This privacy policy will be updated when website features, services or legal requirements change.",
        ],
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
                  href="mailto:yannlemogoun@gmail.com"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0A84FF] px-4 text-sm font-semibold text-white shadow-md shadow-[#0A84FF]/20 transition hover:bg-[#0066CC] hover:shadow-lg"
                >
                  <Mail size={16} aria-hidden="true" />
                  yannlemogoun@gmail.com
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