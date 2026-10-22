import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import ArcDialTestimonial, { Testimonial } from './ArcDialTestimonial';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'B.Sc. Computer Science',
    company: '4th semester',
    initials: 'SM',
    quote:
      'JUSTCODE-KL helped me move from theory to practice. The workshops are pure gold — I built my first real project in three weeks and finally understood what I was learning in class. The mentors are patient, the community is welcoming, and the projects are actually useful. I cannot recommend it enough for anyone who wants to go beyond the lectures.',
    rating: 5,
    resultBadge: 'First project shipped',
    verified: true,
  },
  {
    id: '2',
    name: 'David K.',
    role: 'M.Sc. Artificial Intelligence',
    company: 'Alumnus',
    initials: 'DK',
    quote:
      'Thanks to the career program, I landed my dream internship at SAP. The mock interviews were brutally honest, and that is exactly what I needed. The CV review sessions gave me concrete, actionable feedback. Within two months of joining, I had three interviews lined up — and one offer.',
    rating: 5,
    resultBadge: 'Hired at SAP',
    verified: true,
  },
  {
    id: '3',
    name: 'Lea B.',
    role: 'B.Sc. Computer Science',
    company: '2nd semester',
    initials: 'LB',
    quote:
      'As a beginner I felt welcome right away. I was nervous about joining because I had zero experience, but the community is incredibly supportive. Within my first month I attended three workshops, joined a project team, and made friends who are now my study partners.',
    rating: 5,
    resultBadge: 'From beginner to contributor',
    verified: true,
  },
  {
    id: '4',
    name: 'Tom R.',
    role: 'M.Sc. Cybersecurity',
    company: '3rd semester',
    initials: 'TR',
    quote:
      'The hackathons showed me what I am really capable of. 24 hours, a team of strangers, and a problem I had never solved before — and we won second place. That weekend taught me more than an entire semester of lectures. The energy is addictive.',
    rating: 5,
    resultBadge: '2nd place · Hackathon 2025',
    verified: true,
  },
  {
    id: '5',
    name: 'Anna P.',
    role: 'B.Sc. Computer Science',
    company: '6th semester',
    initials: 'AP',
    quote:
      'My GitHub portfolio looks impressive thanks to the project workshops. I went from zero public repos to seven shipped projects in one semester. Recruiters now reach out to me directly on LinkedIn. That is the power of building real things with real people.',
    rating: 5,
    resultBadge: '7 projects shipped',
    verified: true,
  },
  {
    id: '6',
    name: 'Marc L.',
    role: 'B.Sc. Media Informatics',
    company: '5th semester',
    initials: 'ML',
    quote:
      'I joined for the web development workshop, stayed for the people. The atmosphere is collaborative, not competitive. Everyone here genuinely wants you to succeed. That is rare in tech, and it makes all the difference.',
    rating: 5,
    verified: true,
  },
];

export default function Testimonials() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative overflow-hidden bg-[#FBFBF9] py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-[#A259FF]/30 bg-white px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A259FF]">
              What our members say
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-[#0B0F1A] sm:text-4xl md:text-5xl">
            Real voices, real results
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#475569]">
            Drag the dial, swipe, or use the arrows to explore member stories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <ArcDialTestimonial
            testimonials={testimonials}
            autoPlay={true}
            autoPlayDuration={7000}
          />
        </motion.div>
      </div>
    </section>
  );
}