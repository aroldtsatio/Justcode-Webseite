import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Mail, User, GraduationCap, Hash, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { toast } from 'sonner';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim()) next.name = 'Name is required';
    if (!data.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) next.email = 'Invalid email format';
    if (!data.major.trim()) next.major = 'Major is required';
    if (!data.semester.trim()) next.semester = 'Semester is required';
    if (!data.interests.trim()) next.interests = 'Tell us what interests you';
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Please fix the highlighted fields', {
        description: 'Some required information is missing.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = encodeURIComponent('JUSTCODE-KL membership request');
      const body = encodeURIComponent(
        [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          `Major: ${formData.major}`,
          `Semester: ${formData.semester}`,
          `Interests: ${formData.interests}`,
        ].join('\n')
      );

      window.location.href = `mailto:info@justcode-kl.de?subject=${subject}&body=${body}`;

      toast.success('Application prepared!', {
        description: 'Your mail app should open. Just click Send.',
      });
      
      setFormData({ name: '', email: '', major: '', semester: '', interests: '' });
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      // Fond dégradé du gris clair vers le noir profond (prépare le footer)
      className="relative overflow-hidden bg-gradient-to-b from-[#F1F5F9] to-[#0B0F1A] py-24 sm:py-32"
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/5 px-4 py-2">
              <span className="text-sm font-semibold text-[#0A84FF]">
                Free membership · All RPTU students welcome
              </span>
            </div>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-[#0B0F1A] sm:text-5xl">
              Ready to build your <span className="text-[#0A84FF]">future?</span>
            </h2>
            
            <p className="mb-10 text-lg leading-relaxed text-[#475569]">
              Join 20+ students who are already building real projects, learning from peers, and preparing for their dream tech careers.
            </p>

            <ul className="space-y-4">
              {[
                'Weekly hands-on workshops (AI, Web, Cybersecurity)',
                'Work on real projects with a team',
                'Network with alumni and industry partners',
                'Access to exclusive hackathons and events',
              ].map((benefit, i) => (
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
                    <User className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                    Full name <span className="text-[#A259FF]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.name
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1 text-sm text-[#DC2626]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
                    <Mail className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                    Email address <span className="text-[#A259FF]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.email
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 text-sm text-[#DC2626]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Grid: Major + Semester */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="major" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
                      <GraduationCap className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                      Major <span className="text-[#A259FF]">*</span>
                    </label>
                    <input
                      id="major"
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.major}
                      className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                        errors.major
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                      }`}
                      placeholder="Computer Science"
                    />
                    {errors.major && (
                      <p className="flex items-center gap-1 text-sm text-[#DC2626]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {errors.major}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="semester" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
                      <Hash className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                      Semester <span className="text-[#A259FF]">*</span>
                    </label>
                    <input
                      id="semester"
                      type="text"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.semester}
                      className={`min-h-[52px] w-full rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                        errors.semester
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                          : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                      }`}
                      placeholder="3"
                    />
                    {errors.semester && (
                      <p className="flex items-center gap-1 text-sm text-[#DC2626]">
                        <AlertCircle className="h-4 w-4" aria-hidden="true" />
                        {errors.semester}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label htmlFor="interests" className="flex items-center gap-2 text-sm font-semibold text-[#0B0F1A]">
                    What are you interested in? <span className="text-[#A259FF]">*</span>
                  </label>
                  <textarea
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    rows={3}
                    aria-required="true"
                    aria-invalid={!!errors.interests}
                    className={`w-full resize-none rounded-xl border-2 bg-[#F8FAFC] px-4 py-3 text-base text-[#0B0F1A] transition-all placeholder:text-[#94A3B8] focus:outline-none ${
                      errors.interests
                        ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-4 focus:ring-[#DC2626]/10'
                        : 'border-transparent focus:border-[#0A84FF] focus:bg-white focus:ring-4 focus:ring-[#0A84FF]/10'
                    }`}
                    placeholder="AI, Web Development, Cybersecurity..."
                  />
                  {errors.interests && (
                    <p className="flex items-center gap-1 text-sm text-[#DC2626]">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                      {errors.interests}
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#64748B]">
                  By submitting, an email will be prepared in your mail app. No data is stored on this website.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}