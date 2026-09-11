import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Bot, BookOpen, ChartNoAxesColumn, ExternalLink, Github, Map, ScanSearch, Sparkles } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function Projects() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const projects = [
    {
      name: 'AI Study Assistant',
      icon: Bot,
      desc: 'Machine learning powered study assistant helping students prepare for exams',
      tech: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      github: '#',
    },
    {
      name: 'Campus Navigator',
      icon: Map,
      desc: 'Interactive campus map with AR features for navigation and event discovery',
      tech: ['React Native', 'ARKit', 'Firebase'],
      github: '#',
    },
    {
      name: 'Code Review Bot',
      icon: ScanSearch,
      desc: 'Automated code review tool using AI to suggest improvements and detect bugs',
      tech: ['Python', 'OpenAI', 'GitHub API'],
      github: '#',
    },
    {
      name: 'Smart Library',
      icon: BookOpen,
      desc: 'Digital library management system with book recommendation engine',
      tech: ['Node.js', 'MongoDB', 'Vue.js'],
      github: '#',
    },
    {
      name: 'Event Hub',
      icon: Sparkles,
      desc: 'Platform for discovering and managing university events and workshops',
      tech: ['Next.js', 'PostgreSQL', 'Tailwind'],
      github: '#',
    },
    {
      name: 'Study Tracker',
      icon: ChartNoAxesColumn,
      desc: 'Analytics dashboard for tracking study hours and productivity metrics',
      tech: ['React', 'D3.js', 'Express'],
      github: '#',
    },
  ];

  const toggleFlip = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <section id="projects" ref={ref} className="relative py-24 bg-gradient-to-b from-[#071A52] to-[#0A2470]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-white/62 text-base">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const isFlipped = flippedCards.has(index);
            const Icon = project.icon;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative w-full h-80 cursor-pointer"
                  onClick={() => toggleFlip(index)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute inset-0 backface-hidden border border-white/10 bg-[#0A1D5A]/60 p-8 flex flex-col items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="mb-7 flex h-14 w-14 items-center justify-center border border-[#00D4FF]/30 bg-[#00D4FF]/8 text-[#00D4FF]">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center">{project.name}</h3>
                    <p className="text-[#00D4FF]/75 text-sm mt-2">View details</p>
                  </div>

                  <div
                    className="absolute inset-0 backface-hidden border border-[#00D4FF]/25 bg-[#0F52BA] p-8 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">{project.name}</h3>
                      <p className="text-white/90 text-sm mb-6">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/12 backdrop-blur-sm text-white text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub</span>
                      </a>
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-white/90 rounded-lg text-[#0F52BA] font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
