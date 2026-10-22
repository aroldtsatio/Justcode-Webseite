import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Code2, Users, Rocket, Briefcase } from 'lucide-react';
import { useInView } from './hooks/useInView';

const pillars = [
  {
    icon: Code2,
    title: 'Learn by building',
    desc: 'Weekly workshops, coding sessions, and hands-on projects across AI, web, mobile, cloud, and security.',
    tags: ['AI', 'Web', 'Mobile', 'Cloud', 'Security'],
  },
  {
    icon: Users,
    title: 'Join a community',
    desc: 'Network with fellow students, alumni, and industry partners. Weekly tech talks by students, for students.',
    tags: ['Talks', 'Networking', 'Events'],
  },
  {
    icon: Rocket,
    title: 'Ship real projects',
    desc: 'Work on real-world projects, hackathons, and open-source contributions to build a portfolio that stands out.',
    tags: ['Hackathons', 'Open Source', 'Portfolio'],
  },
  {
    icon: Briefcase,
    title: 'Launch your career',
    desc: 'CV reviews, mock interviews, and connections to internships and jobs at leading tech companies.',
    tags: ['Career', 'Internships', 'Jobs'],
  },
];

export default function WhatWeDo() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={ref} 
      className="relative bg-[#F1F5F9] py-24"
    >
      {/* Fondu noir vers gris pour la transition douce */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0B0F1A] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-[#0A84FF]/20 bg-white px-4 py-1.5 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0A84FF]">
              What we do
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#0B0F1A] sm:text-4xl md:text-5xl">
            Four ways to grow with us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#475569]">
            From your first line of code to your first job — everything you need to become a great developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm transition-all hover:border-[#0A84FF]/30 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[#0A84FF] transition-all group-hover:h-1.5" />

                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0A84FF]/8 text-[#0A84FF] transition-transform group-hover:scale-110">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-[#64748B]">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#0B0F1A]">
                  {pillar.title}
                </h3>
                <p className="mb-6 leading-relaxed text-[#475569]">{pillar.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#475569]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}