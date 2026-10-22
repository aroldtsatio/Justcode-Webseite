import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Bot, UtensilsCrossed, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from './hooks/useInView';

const projects = [
  {
    id: 'ai_study_assistant',
    icon: Bot,
    tech: ['Python', 'TensorFlow', 'React'],
    github: '#',
    color: '#0A84FF',
  },
  {
    id: 'smartmensa',
    icon: UtensilsCrossed,
    tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'Spring Data JPA', 'Maven', 'JUnit 5', 'Mockito', 'JWT'],
    github: '#',
    color: '#A259FF',
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
            From AI assistants to campus apps — see what our community ships.
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative mx-auto h-[690px] sm:h-[630px] w-full max-w-5xl">
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
                  className={`absolute flex min-h-[660px] sm:min-h-[600px] w-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-500 sm:w-[380px] ${
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
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${project.color}15`, color: project.color }}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {t(`projects.items.${project.id}.name`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#94A3B8]">
                      {t(`projects.items.${project.id}.desc`)}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-6">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#CBD5E1]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        <Github className="h-4 w-4" />
                        {t('projects.code')}
                      </a>
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                        style={{ backgroundColor: project.color }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t('projects.demo')}
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
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