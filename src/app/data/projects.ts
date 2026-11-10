import { Bot, Building2, UtensilsCrossed, BookOpen, ChartNoAxesColumn, Map, ScanSearch, Sparkles } from 'lucide-react';
import nexisImg from '../../assets/images/projects/nexis.jpg';

export type Project = {
  id: string;
  planned: boolean;
  icon: typeof Bot;
  tech: string[];
  github: string;
  color: string;
  image?: string;
  live?: string;
  date?: string;
};

export const projects: Project[] = [
  {
    id: 'nexis',
    planned: false,
    icon: Building2,
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Radix UI', 'Vercel'],
    github: '#',
    color: '#00E5FF',
    image: nexisImg,
    live: 'https://nexis-plum.vercel.app',
    date: '09/2026',
  },
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
