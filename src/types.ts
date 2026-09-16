export type ThemeMode = 'dark' | 'beige';

export type ReadingTopic = 'Ads & Ranking' | 'LLMs' | 'Agents' | 'ML Systems' | 'Fundamental Research';

export interface ReadingPost {
  id: string;
  title: string;
  topic: ReadingTopic;
  date: string;
  readingTime: string;
  summary: string;
  takeaways: string[];
  paperTitle?: string;
  paperUrl?: string;
  content: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  badge: string;
  category: 'web' | 'physical';
  description: string;
  url?: string;
  githubUrl?: string;
  tags: string[];
  icon: string;
  status?: string;
}
