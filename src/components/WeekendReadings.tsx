import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookMarked } from 'lucide-react';
import { ReadingTopic, ThemeMode } from '../types';
import { initialReadings } from '../data/readingsData';
import { renderInlineMath } from '../utils/renderMarkdown';

interface WeekendReadingsProps {
  theme: ThemeMode;
}

const topicsList: ('All' | ReadingTopic)[] = [
  'All',
  'Ads & Ranking',
  'LLMs',
  'Agents',
  'Fundamental Research',
];

export const WeekendReadings: React.FC<WeekendReadingsProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedTopic, setSelectedTopic] = useState<'All' | ReadingTopic>('All');

  const filteredPosts = selectedTopic === 'All'
    ? initialReadings
    : initialReadings.filter((post) => post.topic === selectedTopic);

  return (
    <section className={`py-12 px-4 sm:px-8 max-w-4xl mx-auto border-t ${
      isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'
    }`}>
      {/* Section Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3 border ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-[#e8e2d4] border-[#d8cfbe] text-stone-700'
          }`}>
            <BookMarked className="w-3.5 h-3.5 text-[#D97757]" />
            <span>Technical Notes &amp; Summaries</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Research Notes &amp; Technical Synthesis
          </h2>
          <p className={`text-xs sm:text-sm font-mono mt-1 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
            Notes on paper architectures, ML systems, and AI research literature.
          </p>
        </div>
      </div>

      {/* Segmented Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {topicsList.map((t) => {
          const isSelected = selectedTopic === t;
          return (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#FF5500] text-white border-[#FF5500] font-semibold shadow-sm'
                  : isDark
                  ? 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  : 'bg-[#efe8db] border-[#d8cfbe] text-stone-700 hover:bg-[#e4ddd0]'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Grid of Readings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/reading/${post.id}`}
            className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:-translate-y-1 no-underline ${
              isDark
                ? 'bg-[#121215] hover:bg-[#18181c] border-zinc-800 hover:border-[#FF5500]/50'
                : 'bg-[#f5f0e6] hover:bg-[#eae3d5] border-[#d8cfbe] hover:border-[#FF5500] shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] uppercase font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                    isDark ? 'bg-zinc-900 border-zinc-800 text-[#D97757]' : 'bg-[#e4ddd0] border-[#c8bca8] text-stone-800'
                  }`}
                >
                  {post.topic}
                </span>
                <span className={`text-xs font-mono flex items-center gap-1 ${isDark ? 'text-zinc-500' : 'text-stone-500'}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <h3 className={`font-serif font-bold text-lg leading-snug mb-3 group-hover:text-[#FF5500] transition-colors ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                {post.title}
              </h3>

              <p
                className={`text-xs leading-relaxed mb-4 line-clamp-3 ${isDark ? 'text-zinc-400' : 'text-stone-700'}`}
                dangerouslySetInnerHTML={{ __html: renderInlineMath(post.summary) }}
              />
            </div>

            <div className={`pt-4 border-t flex items-center justify-between ${
              isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'
            }`}>
              <span className={`text-[11px] font-mono ${isDark ? 'text-zinc-500' : 'text-stone-500'}`}>
                {post.date}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#FF5500] group-hover:underline"
              >
                <span>Read Note</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
