import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Mail, User, GraduationCap, Hash, AlertCircle, CheckCircle2, Linkedin, ArrowUpRight } from 'lucide-react';
import { useInView } from './hooks/useInView';

const CONTACT_EMAIL = 'yannlemogoun@gmail.com';

function buildMail(data: { name: string; email: string; major: string; semester: string; interests: string }) {
  const subject = `Anmeldung JUSTCODE-KL: ${data.name.trim()}`;
  const body = [
    'Hallo JUSTCODE-KL-Team,',
    '',
    'ich möchte Mitglied werden.',
    '',
    `Name: ${data.name.trim()}`,
    `E-Mail: ${data.email.trim()}`,
    `Studiengang: ${data.major.trim()}`,
    `Semester: ${data.semester.trim()}`,
    `Interessen: ${data.interests.trim()}`,
  ].join(String.fromCharCode(10));
  const q = `to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&${q}`,
    mailto: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

interface FormData {
  name: string;
  email: string;
  major: string;
  semester: string;
  interests: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function JoinCTA() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    major: '',
    semester: '',
    interests: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorCode, setErrorCode] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');
  const isSubmitting = false;

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim() || data.name.length > 120) next.name = t('join.field_errors.name');
    if (!/\S+@\S+\.\S+/.test(data.email) || data.email.length > 254) next.email = t('join.field_errors.email');
    if (!data.major.trim() || data.major.length > 160) next.major = t('join.field_errors.major');
    const semester = Number(data.semester);
    if (!Number.isInteger(semester) || semester < 1 || semester > 30) next.semester = t('join.field_errors.semester');
    if (!data.interests.trim() || data.interests.length > 2000) next.interests = t('join.field_errors.interests');
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmissionStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setErrorCode('');
    if (Object.keys(nextErrors).length > 0) {
      setErrorCode('validation_failed');
      setSubmissionStatus('error');
      return;
    }
    // Opens a pre-filled Gmail draft in a new tab; the visitor only has to click "Send".
    const mail = buildMail(formData);
    setMailtoLink(mail.mailto);
    window.open(mail.gmail, '_blank', 'noopener,noreferrer');
    setSubmissionStatus('success');
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* LEFT: Text & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <span className="jc-eyebrow">{t('join.badge')}</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t('join.heading_start')}<span className="jc-gradient-text">{t('join.heading_highlight')}</span>
            </h2>
            
            <p className="mb-10 text-lg leading-relaxed text-[#94A3B8]">
              {t('join.intro')}
            </p>

            <ul className="space-y-4">
              {(t('join.benefits', { returnObjects: true }) as string[]).map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-[#E2E8F0]"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/10 text-[#00E5FF]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="https://www.linkedin.com/company/129874045/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="group mt-10 flex items-center gap-4 rounded-2xl border border-[#0A84FF]/30 bg-[#0A84FF]/[0.07] p-4 transition hover:-translate-y-0.5 hover:border-[#0A84FF]/60 hover:bg-[#0A84FF]/[0.12]"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-white shadow-lg shadow-[#0A66C2]/30">
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-white">{t('join.linkedin_title')}</span>
                <span className="block text-sm text-[#94A3B8]">{t('join.linkedin_text')}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[#7DC4FF] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#0A84FF]/25 to-[#A259FF]/25 blur-3xl" />
            
            <div className="relative rounded-3xl border border-white/10 bg-[#0D1220]/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-[#E2E8F0]">
                    <User className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                    {t('join.form_name')} <span className="text-[#A259FF]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    maxLength={120}
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "join-name-error" : undefined}
                    disabled={isSubmitting}
                    className={`min-h-[52px] w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white transition-all placeholder:text-[#64748B] focus:outline-none ${
                      errors.name
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-white/10 hover:border-white/20 focus:border-[#0A84FF] focus:bg-white/[0.06] focus:ring-4 focus:ring-[#0A84FF]/15'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p id="join-name-error" className="flex items-center gap-1 text-sm text-[#F87171]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {t('join.field_errors.name')}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-[#E2E8F0]">
                    <Mail className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                    {t('join.form_email')} <span className="text-[#A259FF]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    maxLength={254}
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "join-email-error" : undefined}
                    disabled={isSubmitting}
                    className={`min-h-[52px] w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white transition-all placeholder:text-[#64748B] focus:outline-none ${
                      errors.email
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-white/10 hover:border-white/20 focus:border-[#0A84FF] focus:bg-white/[0.06] focus:ring-4 focus:ring-[#0A84FF]/15'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p id="join-email-error" className="flex items-center gap-1 text-sm text-[#F87171]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {t('join.field_errors.email')}
                    </p>
                  )}
                </div>

                {/* Grid: Major + Semester */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="major" className="flex items-center gap-2 text-sm font-semibold text-[#E2E8F0]">
                      <GraduationCap className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                      {t('join.form_major')} <span className="text-[#A259FF]">*</span>
                    </label>
                    <input
                      id="major"
                      type="text"
                      name="major"
                    maxLength={160}
                      value={formData.major}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.major}
                    aria-describedby={errors.major ? "join-major-error" : undefined}
                    disabled={isSubmitting}
                      className={`min-h-[52px] w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white transition-all placeholder:text-[#64748B] focus:outline-none ${
                        errors.major
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-white/10 hover:border-white/20 focus:border-[#0A84FF] focus:bg-white/[0.06] focus:ring-4 focus:ring-[#0A84FF]/15'
                      }`}
                      placeholder={t('join.major_placeholder')}
                    />
                    {errors.major && (
                      <p id="join-major-error" className="flex items-center gap-1 text-sm text-[#F87171]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {t('join.field_errors.major')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="semester" className="flex items-center gap-2 text-sm font-semibold text-[#E2E8F0]">
                      <Hash className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                      {t('join.form_semester')} <span className="text-[#A259FF]">*</span>
                    </label>
                    <input
                      id="semester"
                      type="number"
                      min={1}
                      max={30}
                      step={1}
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.semester}
                    aria-describedby={errors.semester ? "join-semester-error" : undefined}
                    disabled={isSubmitting}
                      className={`min-h-[52px] w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white transition-all placeholder:text-[#64748B] focus:outline-none ${
                        errors.semester
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-white/10 hover:border-white/20 focus:border-[#0A84FF] focus:bg-white/[0.06] focus:ring-4 focus:ring-[#0A84FF]/15'
                      }`}
                      placeholder="3"
                    />
                    {errors.semester && (
                      <p id="join-semester-error" className="flex items-center gap-1 text-sm text-[#F87171]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {t('join.field_errors.semester')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label htmlFor="interests" className="flex items-center gap-2 text-sm font-semibold text-[#E2E8F0]">
                    {t('join.form_interests')} <span className="text-[#A259FF]">*</span>
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    maxLength={2000}
                    value={formData.interests}
                    onChange={handleChange}
                    rows={3}
                    aria-required="true"
                    aria-invalid={!!errors.interests}
                    aria-describedby={errors.interests ? "join-interests-error" : undefined}
                    disabled={isSubmitting}
                    className={`w-full resize-none rounded-xl border bg-white/[0.04] px-4 py-3 text-base text-white transition-all placeholder:text-[#64748B] focus:outline-none ${
                      errors.interests
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-white/10 hover:border-white/20 focus:border-[#0A84FF] focus:bg-white/[0.06] focus:ring-4 focus:ring-[#0A84FF]/15'
                    }`}
                    placeholder={t('join.interests_placeholder')}
                  />
                  {errors.interests && (
                    <p id="join-interests-error" className="flex items-center gap-1 text-sm text-[#F87171]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {t('join.field_errors.interests')}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A84FF] to-[#A259FF] px-6 text-lg font-bold text-white shadow-lg shadow-[#0A84FF]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0A84FF]/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A84FF]/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {t('join.form_submitting')}
                    </>
                  ) : (
                    <>
                      {t('join.form_submit')}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div aria-live="polite" aria-atomic="true">
                  {submissionStatus === 'success' && (
                    <p role="status" className="text-sm text-emerald-400">
                      {t('join.form_success')}{' '}
                      <a href={mailtoLink} className="font-semibold text-[#7DC4FF] underline-offset-2 hover:underline">
                        {t('join.mail_fallback')}
                      </a>
                    </p>
                  )}
                  {submissionStatus === 'error' && <p role="alert" className="text-sm text-[#F87171]">{t(['join.errors.' + errorCode, 'join.errors.service_unavailable'])}</p>}
                </div>
                <p className="text-center text-xs text-[#94A3B8]">
                  {t('join.privacy_notice')}{' '}
                  <a href="#/privacy" className="font-semibold text-[#0A84FF] hover:underline">{t('footer.privacy')}</a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
