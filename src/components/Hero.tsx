import React from 'react';
import { MapPin, Linkedin, Twitter, Instagram, Github, Mail } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeroProps {
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Profile Avatar Card */}
        <div className="shrink-0">
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border shadow-xl border-[#FF5500]/40 bg-amber-500/10">
            <img
              src="./profile.png"
              alt="Vijai Rangan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>California, USA</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}>
            Vijai Rangan
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed mb-6 font-sans ${
            isDark ? 'text-zinc-300' : 'text-stone-700'
          }`}>
            Data Scientist. Focused on AI research, machine learning systems, and building simple, high-utility tools — spanning software and physical hardware.
          </p>

          {/* Social Links Row (Unified Monochrome Icons) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <a
              href="https://www.linkedin.com/in/vijairangan"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500] hover:border-[#FF5500]/40'
                  : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-stone-700 hover:text-[#FF5500] hover:border-[#FF5500]/40 shadow-sm'
              }`}
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/vijairangan"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500] hover:border-[#FF5500]/40'
                  : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-stone-700 hover:text-[#FF5500] hover:border-[#FF5500]/40 shadow-sm'
              }`}
              title="X (@vijairangan)"
              aria-label="X (@vijairangan)"
            >
              <Twitter className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/vijaik2k7"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500] hover:border-[#FF5500]/40'
                  : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-stone-700 hover:text-[#FF5500] hover:border-[#FF5500]/40 shadow-sm'
              }`}
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://github.com/vijaik2k7"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500] hover:border-[#FF5500]/40'
                  : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-stone-700 hover:text-[#FF5500] hover:border-[#FF5500]/40 shadow-sm'
              }`}
              title="GitHub"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="mailto:vijai.kasthurirangan@gmail.com"
              className={`p-2.5 rounded-xl border transition-all ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500] hover:border-[#FF5500]/40'
                  : 'bg-[#e4ddd0] hover:bg-[#d8cebc] border-[#c8bca8] text-stone-700 hover:text-[#FF5500] hover:border-[#FF5500]/40 shadow-sm'
              }`}
              title="Email"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
