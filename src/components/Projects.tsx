import React from 'react';
import { ExternalLink, Github, Scissors, Activity, Lock, Dumbbell, ScanLine } from 'lucide-react';
import { ThemeMode, ProjectItem } from '../types';

interface ProjectsProps {
  theme: ThemeMode;
}

export const Projects: React.FC<ProjectsProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const projects: ProjectItem[] = [
    {
      id: 'food-analyzer',
      name: 'Food Analyzer',
      badge: 'Nutrition',
      category: 'web',
      description: 'Take a photo or enter ingredients of a food product to get a nutrition grade (A–F) and ingredient breakdown.',
      url: 'https://vijaik2k7.github.io/food-analyzer/',
      githubUrl: 'https://github.com/vijaik2k7/food-analyzer',
      tags: ['Gemini API', 'Camera API', 'Browser'],
      icon: 'scan',
    },
    {
      id: 'kinetic-routine',
      name: 'Kinetic Routine',
      badge: 'Fitness',
      category: 'web',
      description: 'Twice-weekly full-body workout tracker with form guides, interval rest timers, 3-phase progression, and set logging.',
      url: 'https://vijaik2k7.github.io/kinetic-routine/',
      githubUrl: 'https://github.com/vijaik2k7/kinetic-routine',
      tags: ['Day A/B Split', 'Rest Timer', 'Workout Log'],
      icon: 'dumbbell',
    },
    {
      id: 'hushcut',
      name: 'HushCut',
      badge: 'Audio',
      category: 'web',
      description: 'Trim silent pauses and crop audio files in the browser. Exports MP3 or WAV locally without uploading files.',
      url: 'https://vijaik2k7.github.io/hushcut/',
      githubUrl: 'https://github.com/vijaik2k7/hushcut',
      tags: ['Web Audio API', 'MP3 / WAV', 'Browser'],
      icon: 'scissors',
    },
    {
      id: 'pulse-metronome',
      name: 'Pulse Metronome',
      badge: 'Music',
      category: 'web',
      description: 'Web metronome with tap tempo, custom beat accents, time signatures, and standard tempo markings.',
      url: 'https://vijaik2k7.github.io/pulse-metronome/',
      githubUrl: 'https://github.com/vijaik2k7/pulse-metronome',
      tags: ['Web Audio API', 'Tap Tempo', 'Time Signatures'],
      icon: 'activity',
    },
    {
      id: 'pdf-redactor',
      name: 'PDFRedact',
      badge: 'PDF',
      category: 'web',
      description: 'Draw redaction boxes or match patterns (emails, SSNs) to black out text and export flattened PDF files in the browser.',
      url: 'https://vijaik2k7.github.io/pdf-redactor/',
      githubUrl: 'https://github.com/vijaik2k7/pdf-redactor',
      tags: ['pdf-lib', 'Pattern Match', 'Browser'],
      icon: 'lock',
    },
  ];

  const renderIcon = (iconName: string) => {
    const iconClass = isDark ? 'text-[#D97757]' : 'text-[#FF5500]';
    switch (iconName) {
      case 'scan':
        return <ScanLine className={`w-5 h-5 ${iconClass}`} />;
      case 'dumbbell':
        return <Dumbbell className={`w-5 h-5 ${iconClass}`} />;
      case 'scissors':
        return <Scissors className={`w-5 h-5 ${iconClass}`} />;
      case 'activity':
        return <Activity className={`w-5 h-5 ${iconClass}`} />;
      case 'lock':
        return <Lock className={`w-5 h-5 ${iconClass}`} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="projects"
      className={`py-12 px-4 sm:px-8 max-w-4xl mx-auto border-t ${
        isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'
      }`}
    >
      {/* Section Header */}
      <div className="mb-8">
        <h2 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          Web Utilities
        </h2>
        <p className={`text-xs sm:text-sm font-mono mt-1 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Browser tools that run locally on your device.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group hover:-translate-y-1 ${
              isDark
                ? 'bg-[#121215] hover:bg-[#18181c] border-zinc-800 hover:border-[#FF5500]/50'
                : 'bg-[#f5f0e6] hover:bg-[#eae3d5] border-[#d8cfbe] hover:border-[#FF5500] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-zinc-700/20">
                  {renderIcon(proj.icon)}
                </div>
                <span className={`text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-800'
                }`}>
                  {proj.badge}
                </span>
              </div>

              <h3 className={`font-mono font-bold text-base mb-2 group-hover:text-[#FF5500] transition-colors ${
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

              <div className={`flex items-center justify-between pt-3 border-t ${
                isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'
              }`}>
                {proj.url ? (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#FF5500] hover:underline"
                  >
                    <span>Launch App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-amber-500/15 border-amber-600/30 text-amber-800'
                  }`}>
                    {proj.status || 'Physical Spec'}
                  </span>
                )}

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
