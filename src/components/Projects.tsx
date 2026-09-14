import React from 'react';
import { ExternalLink, Github, Scissors, Activity, Lock } from 'lucide-react';
import { ThemeMode, ProjectItem } from '../types';

interface ProjectsProps {
  theme: ThemeMode;
}

export const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const projects: ProjectItem[] = [
    {
      id: 'hushcut',
      name: 'HushCut',
      badge: 'Audio Utility',
      description: '100% browser-based audio extractor and dead air silence trimmer. Strip silent pauses, crop waveforms, and export MP3/WAV with zero server uploads.',
      url: 'https://vijaik2k7.github.io/hushcut/',
      githubUrl: 'https://github.com/vijaik2k7/hushcut',
      tags: ['Web Audio API', 'Waveform Visualizer', '0 Server Uploads'],
      icon: 'scissors',
    },
    {
      id: 'pulse-metronome',
      name: 'Pulse Metronome',
      badge: 'Music Utility',
      description: 'Sample-accurate online metronome app powered by Web Audio API lookahead scheduling. Features tap tempo, custom beat accents, and Italian tempo terms.',
      url: 'https://vijaik2k7.github.io/pulse-metronome/',
      githubUrl: 'https://github.com/vijaik2k7/pulse-metronome',
      tags: ['Lookahead Scheduler', 'Tap Tempo', 'Beige/Dark Mode'],
      icon: 'activity',
    },
    {
      id: 'pdf-redactor',
      name: 'PDFRedact',
      badge: 'Privacy Utility',
      description: 'Zero-server PDF redactor & anonymizer. Draw black redaction boxes, auto-detect SSNs & emails, and export flattened, non-extractable PDFs.',
      url: 'https://vijaik2k7.github.io/pdf-redactor/',
      githubUrl: 'https://github.com/vijaik2k7/pdf-redactor',
      tags: ['pdf-lib', 'Pattern Auto-Detect', '100% Confidential'],
      icon: 'lock',
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'scissors':
        return <Scissors className="w-5 h-5 text-[#FF5500]" />;
      case 'activity':
        return <Activity className="w-5 h-5 text-[#D97757]" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-4xl mx-auto border-t border-zinc-800/40">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className={`text-2xl font-serif font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Featured Web Utilities
          </h2>
          <p className={`text-xs font-mono mt-1 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
            Free, 100% client-side browser tools built with zero server overhead.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 ${
              isDark
                ? 'bg-[#121215] hover:bg-[#18181c] border-zinc-800 hover:border-[#FF5500]/60'
                : 'bg-[#f5f0e6] hover:bg-[#eae3d5] border-[#d8cfbe] hover:border-[#FF5500] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-black/10 dark:bg-white/5 flex items-center justify-center border border-zinc-700/30">
                  {renderIcon(proj.icon)}
                </div>
                <span className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-800'
                }`}>
                  {proj.badge}
                </span>
              </div>

              <h3 className={`font-mono font-bold text-lg mb-2 group-hover:text-[#FF5500] transition-colors ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                {proj.name}
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-stone-700'}`}>
                {proj.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400' : 'bg-[#e4ddd0]/70 border-[#c8bca8] text-stone-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/40">
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#FF5500] hover:underline"
                >
                  <span>Launch App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 rounded-md transition-colors ${
                      isDark ? 'text-zinc-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
