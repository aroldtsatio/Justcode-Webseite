import { FileText, GitBranch, KanbanSquare } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Workshop = {
  id: string;
  dateTime: string;
  icon: LucideIcon;
  color: string;
};

// Chronological order; rendered newest first
export const workshops: Workshop[] = [
  {
    id: 'git',
    dateTime: '2026-05',
    icon: GitBranch,
    color: '#0A84FF',
  },
  {
    id: 'trello',
    dateTime: '2026-07',
    icon: KanbanSquare,
    color: '#A259FF',
  },
  {
    id: 'career',
    dateTime: '2026-08',
    icon: FileText,
    color: '#00E5FF',
  },
];
