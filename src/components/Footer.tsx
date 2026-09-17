import React from 'react';
import { Github, Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t px-4 py-6 sm:px-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono transition-colors ${
        isDark ? 'border-zinc-800/60 text-zinc-500' : 'border-[#d8cfbe] text-stone-600'
      }`}
    >
      <div className="flex items-center gap-2 text-center sm:text-left">
        <span>Vijai Rangan • Built with React &amp; Tailwind</span>
      </div>

      <div className="flex items-center gap-2.5">
        <a
          href="https://www.linkedin.com/in/vijairangan"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
          title="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        <a
          href="https://x.com/vijairangan"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
          title="X (@vijairangan)"
        >
          <Twitter className="w-4 h-4" />
        </a>

        <a
          href="https://www.instagram.com/vijaik2k7"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
          title="Instagram"
        >
          <Instagram className="w-4 h-4" />
        </a>

        <a
          href="https://github.com/vijaik2k7"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
          title="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href="mailto:vijai.kasthurirangan@gmail.com"
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
          title="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};
