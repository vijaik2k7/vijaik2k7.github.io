import React from 'react';
import { Coffee, Github, Mail, ShieldCheck, Linkedin, Twitter, Instagram } from 'lucide-react';
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
      <div className="flex items-center gap-1.5 text-center sm:text-left">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Vijai Rangan • Built with React &amp; Tailwind</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Buy Me a Coffee Button */}
        <a
          href="https://buymeacoffee.com/vijaik2k7"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
            isDark
              ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-amber-400 hover:text-amber-300'
              : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-amber-800 shadow-sm'
          }`}
        >
          <Coffee className="w-3.5 h-3.5 text-amber-500" />
          <span>Buy me a coffee</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vijairangan"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-sky-400' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-700 hover:text-sky-600'
          }`}
          title="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>

        {/* X (Twitter) */}
        <a
          href="https://x.com/vijairangan"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-700 hover:text-stone-900'
          }`}
          title="X (Twitter) Profile"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/vijaik2k7"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-pink-400' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-700 hover:text-pink-600'
          }`}
          title="Instagram Profile"
        >
          <Instagram className="w-4 h-4" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/vijaik2k7"
          target="_blank"
          rel="noopener noreferrer"
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-700 hover:text-stone-900'
          }`}
          title="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>

        {/* Email */}
        <a
          href="mailto:vijai.kasthurirangan@gmail.com"
          className={`p-1.5 rounded-lg border transition-colors ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-700 hover:text-stone-900'
          }`}
          title="Send Email"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};
