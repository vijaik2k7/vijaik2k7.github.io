import thermodynamicImperative from './thermodynamic-imperative.md?raw';

export interface Post {
  slug: string;
  title: string;
  date: string;
  minutes: number;
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'thermodynamic-imperative',
    title: 'The Thermodynamic Imperative: From Stellar Furnaces to the Informational Architecture of Life',
    date: 'November 10, 2026',
    minutes: 9,
    body: thermodynamicImperative,
  },
];
