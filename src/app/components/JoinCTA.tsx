import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Mail, User, GraduationCap, Hash, Sparkles } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function JoinCTA() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    major: '',
    semester: '',
    interests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 bg-gradient-to-b from-[#0A2470] to-[#071A52] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#0F52BA]/20 to-[#00D4FF]/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#00D4FF]" />
            <span className="text-[#00D4FF] font-medium">Join Our Community</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('join.title')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('join.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00D4FF]/10 to-transparent rounded-full blur-3xl" />

          <form onSubmit={handleSubmit} className="relative space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <User className="w-4 h-4" />
                  {t('join.form_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/10 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Mail className="w-4 h-4" />
                  {t('join.form_email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/10 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <GraduationCap className="w-4 h-4" />
                  {t('join.form_major')}
                </label>
                <input
                  type="text"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/10 transition-all"
                  placeholder="Computer Science"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Hash className="w-4 h-4" />
                  {t('join.form_semester')}
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/10 transition-all"
                  placeholder="3"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">
                {t('join.form_interests')}
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/50 focus:bg-white/10 transition-all resize-none"
                placeholder="AI, Web Development, Cybersecurity..."
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#0F52BA] to-[#00D4FF] text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/30 hover:shadow-[#00D4FF]/50 transition-all"
            >
              <span>{t('join.form_submit')}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
