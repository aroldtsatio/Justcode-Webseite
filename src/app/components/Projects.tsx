import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Bot, UtensilsCrossed, BookOpen, ChartNoAxesColumn, Map, ScanSearch, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from './hooks/useInView';

const projects = [
  {
    id: 'smartmensa',
    planned: false,
    icon: UtensilsCrossed,
    tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Spring Data JPA', 'Maven', 'JUnit 5', 'Mockito', 'JWT'],
    github: '#',
    color: '#A259FF',
  },
  {
    id: 'job_ai_assist',
    icon: Bot,
    tech: ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'OpenAI API', 'JWT'],
    planned: true,
    github: '#',
    color: '#0A84FF',
  },
  {
    id: 'campus_navigator',
    icon: Map,
    planned: true,
    tech: ['React Native', 'ARKit', 'Firebase'],
    github: '#',
    color: '#A259FF',
  },
  {
    id: 'code_review_bot',
    icon: ScanSearch,
    planned: true,
    tech: ['Python', 'OpenAI', 'GitHub API'],
    github: '#',
    color: '#00E5FF',
  },
  {
    id: 'smart_library',
    icon: BookOpen,
    planned: true,
    tech: ['Node.js', 'MongoDB', 'Vue.js'],
    github: '#',
    color: '#0A84FF',
  },
  {
    id: 'event_hub',
    icon: Sparkles,
    planned: true,
    tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
    github: '#',
    color: '#A259FF',
  },
  {
    id: 'study_tracker',
    icon: ChartNoAxesColumn,
    planned: true,
    tech: ['React', 'D3.js', 'Express'],
    github: '#',
    color: '#00E5FF',
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  
  // Index of the card currently in the center
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  const goTo = (index: number) => setActiveIndex(index);

  // Calculate the offset for each card relative to the active one
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;
    
    // Wrap around for infinite effect
    if (offset > projects.length / 2) offset -= projects.length;
    if (offset < -projects.length / 2) offset += projects.length;

    const isActive = index === activeIndex;

    // Base styles for active card
    let x = offset * 100; // Percentage-based horizontal offset
    let scale = isActive ? 1 : 0.85;
    let rotateY = 0;
    let opacity = isActive ? 1 : 0.4;
    let zIndex = isActive ? 20 : 10 - Math.abs(offset);
    let filter = isActive ? 'none' : 'blur(2px) brightness(0.6)';

    // Coverflow effect: rotate and move the side cards
    if (offset === -1) {
      x = -65; // Move to the left
      rotateY = 25; // Tilt towards the center
      zIndex = 15;
    } else if (offset === 1) {
      x = 65; // Move to the right
      rotateY = -25; // Tilt towards the center
      zIndex = 15;
    } else if (Math.abs(offset) > 1) {
      x = offset * 80;
      scale = 0.7;
      opacity = 0;
    }

    return {
      transform: `translateX(${x}%) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter,
    };
  };

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-[#0B0F1A] py-24" style={{ perspective: '1200px' }}>
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,132,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(10,132,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-[#00E5FF]/30 bg-[#0B0F1A]/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00E5FF]">
              {t('projects.eyebrow')}
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t('projects.heading')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#94A3B8]">
            {t('projects.intro')}
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative mx-auto h-[360px] sm:h-[420px] w-full max-w-5xl">
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;
              const Icon = project.icon;

              return (
                <motion.article
                  key={project.id}
                  onClick={() => goTo(index)}
                  animate={style}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className={`absolute flex h-[320px] w-[320px] sm:h-[380px] cursor-pointer flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 sm:w-[380px] ${
                    isActive 
                      ? 'border-[#0A84FF]/50 bg-gradient-to-b from-[#1E293B] to-[#0B0F1A] shadow-2xl shadow-[#0A84FF]/20' 
                      : 'border-white/10 bg-[#0B0F1A]'
                  }`}
                  style={{ 
                    ...style, 
                    transformStyle: 'preserve-3d',
                    boxShadow: isActive ? `0 20px 60px ${project.color}30` : 'none'
                  }}
                >
                  {/* Glow effect on active card */}
                  {isActive && (
                    <div 
                      className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-[60px]"
                      style={{ backgroundColor: `${project.color}40` }}
                    />
                  )}

                  <div className="relative z-10 mb-auto">
                    <div 
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${project.color}15`, color: project.color }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    {project.planned && (
                      <span className="mb-2 inline-flex rounded-full border border-[#0A84FF]/30 bg-[#0A84FF]/10 px-3 py-1 text-xs font-semibold text-[#93C5FD]">
                        {t('projects.planned_status')}
                      </span>
                    )}
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {t(`projects.items.${project.id}.name`)}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-[#94A3B8]">
                      {t(`projects.items.${project.id}.desc`)}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#CBD5E1]">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-1 py-1 text-xs text-[#94A3B8]">+{project.tech.length - 3}</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#0A84FF] hover:bg-[#0A84FF]/20"
            aria-label={t('projects.previous')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-[#0A84FF]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={t('projects.go_to', { number: index + 1 })}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#0A84FF] hover:bg-[#0A84FF]/20"
            aria-label={t('projects.next')}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>


      </div>
    </section>
  );
}