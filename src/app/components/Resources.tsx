import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Map,
  FileText,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useInView } from './hooks/useInView';
import WordReveal from './WordReveal';

interface ResourceItem {
  title: string;
  url: string;
  desc: string;
  icon: typeof BookOpen;
}

interface TabDef {
  key: string;
  label: string;
  items: ResourceItem[];
}

const tabs: TabDef[] = [
  {
    key: 'courses',
    label: 'Courses',
    items: [
      {
        title: 'CS50 — Harvard',
        url: 'https://cs50.harvard.edu',
        desc: 'The classic intro to computer science',
        icon: BookOpen,
      },
      {
        title: 'FreeCodeCamp',
        url: 'https://freecodecamp.org',
        desc: 'Hands-on web dev certifications',
        icon: BookOpen,
      },
      {
        title: 'Fast.ai',
        url: 'https://fast.ai',
        desc: 'Practical deep learning for coders',
        icon: Sparkles,
      },
    ],
  },
  {
    key: 'roadmaps',
    label: 'Roadmaps',
    items: [
      {
        title: 'Frontend Developer',
        url: 'https://roadmap.sh/frontend',
        desc: 'Complete path to frontend mastery',
        icon: Map,
      },
      {
        title: 'Backend Developer',
        url: 'https://roadmap.sh/backend',
        desc: 'APIs, databases, servers',
        icon: Map,
      },
      {
        title: 'DevOps',
        url: 'https://roadmap.sh/devops',
        desc: 'CI/CD, cloud, infrastructure',
        icon: Map,
      },
    ],
  },
  {
    key: 'guides',
    label: 'Guides',
    items: [
      {
        title: 'Git Handbook',
        url: 'https://guides.github.com/introduction/git-handbook/',
        desc: 'Git essentials for beginners',
        icon: FileText,
      },
      {
        title: 'Linux Journey',
        url: 'https://linuxjourney.com',
        desc: 'Learn Linux from scratch',
        icon: FileText,
      },
    ],
  },
];

export default function Resources() {
  const { t } = useTranslation();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<string>('courses');

  const activeItems =
    tabs.find((tab) => tab.key === activeTab)?.items ?? [];

  return (
    <section
      id="resources"
      ref={ref}
      className="relative bg-[#071A52] py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
            {t('resources.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-white/62">
            {t('resources.subtitle')}
          </p>
        </motion.div>

        {/* Animated tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'text-[#071A52]'
                  : 'border border-white/10 bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {activeTab === tab.key && (
                <motion.span
                  layoutId="activeResourceTab"
                  className="absolute inset-0 -z-10 rounded-full bg-[#00D4FF]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content with word reveal */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {activeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={`${activeTab}-${item.title}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group block border border-white/10 bg-[#0A1D5A]/55 p-6 transition-all hover:border-[#00D4FF]/40 hover:bg-[#0B2466]/70"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/40 transition group-hover:text-[#00D4FF]" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    <WordReveal text={item.title} staggerDelay={0.03} />
                  </h3>
                  <p className="text-sm text-white/60">
                    <WordReveal
                      text={item.desc}
                      staggerDelay={0.02}
                      duration={0.3}
                    />
                  </p>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}