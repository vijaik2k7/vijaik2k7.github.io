export type ThemeMode = 'dark' | 'beige';

export interface ProjectItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  url: string;
  githubUrl?: string;
  tags: string[];
  icon: string;
}
