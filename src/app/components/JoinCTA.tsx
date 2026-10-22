import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Mail, User, GraduationCap, Hash, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { RegistrationError, submitRegistration } from '../utils/registration';

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
  const [website, setWebsite] = useState('');
  const isSubmitting = submissionStatus === 'submitting';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setErrorCode('');
    if (Object.keys(nextErrors).length > 0) {
      setErrorCode('validation_failed');
      setSubmissionStatus('error');
      return;
    }
    setSubmissionStatus('submitting');
    try {
      await submitRegistration({ ...formData, website });
      setFormData({ name: '', email: '', major: '', semester: '', interests: '' });
      setWebsite('');
      setSubmissionStatus('success');
    } catch (error) {
      if (error instanceof RegistrationError) {
        setErrorCode(error.code);
        const next: FormErrors = {};
        for (const field of Object.keys(error.fields)) {
          if (field in formData) next[field as keyof FormData] = t(`join.field_errors.${field}`);
        }
        setErrors(next);
      } else {
        setErrorCode('service_unavailable');
      }
      setSubmissionStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#F1F5F9] py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* LEFT: Text & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/5 px-4 py-2">
              <span className="text-sm font-semibold text-[#0A84FF]">
                {t('join.badge')}
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-[#0B0F1A] sm:text-5xl">
              {t('join.heading_start')}<span className="text-[#0A84FF]">{t('join.heading_highlight')}</span>
            </h2>
            
            <p className="mb-10 text-lg leading-relaxed text-[#475569]">
              {t('join.intro')}
            </p>

            <ul className="space-y-4">
              {(t('join.benefits', { returnObjects: true }) as string[]).map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-[#0B0F1A]"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#0A84FF]/10 text-[#0A84FF]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#0A84FF]/10 to-[#A259FF]/10 blur-2xl" />
            
            <div className="relative rounded-3xl border border-white bg-white p-8 shadow-2xl shadow-[#0B0F1A]/10 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={isSubmitting}>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="join-website">Website</label>
                  <input id="join-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
                </div>
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
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
                    className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.name
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p id="join-name-error" className="flex items-center gap-1 text-sm text-[#DC2626]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {t('join.field_errors.name')}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
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
                    className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.email
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p id="join-email-error" className="flex items-center gap-1 text-sm text-[#DC2626]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {t('join.field_errors.email')}
                    </p>
                  )}
                </div>

                {/* Grid: Major + Semester */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="major" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
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
                      className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                        errors.major
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                      }`}
                      placeholder={t('join.major_placeholder')}
                    />
                    {errors.major && (
                      <p id="join-major-error" className="flex items-center gap-1 text-sm text-[#DC2626]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {t('join.field_errors.major')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="semester" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
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
                      className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                        errors.semester
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                      }`}
                      placeholder="3"
                    />
                    {errors.semester && (
                      <p id="join-semester-error" className="flex items-center gap-1 text-sm text-[#DC2626]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {t('join.field_errors.semester')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label htmlFor="interests" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
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
                    className={`w-full resize-none rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.interests
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder={t('join.interests_placeholder')}
                  />
                  {errors.interests && (
                    <p id="join-interests-error" className="flex items-center gap-1 text-sm text-[#DC2626]">
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
                  {submissionStatus === 'success' && <p role="status" className="text-sm text-green-700">{t('join.form_success')}</p>}
                  {submissionStatus === 'error' && <p role="alert" className="text-sm text-[#DC2626]">{t(['join.errors.' + errorCode, 'join.errors.service_unavailable'])}</p>}
                </div>
                <p className="text-center text-xs text-[#64748B]">
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
