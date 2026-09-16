import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, Clock, Tag, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { initialReadings } from '../data/readingsData';
import { renderMarkdownWithMath, renderInlineMath } from '../utils/renderMarkdown';

interface ReadingPageProps {
  theme: ThemeMode;
}

export const ReadingPage: React.FC<ReadingPageProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const { id } = useParams<{ id: string }>();
  const post = initialReadings.find((r) => r.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 max-w-3xl mx-auto text-center">
        <p className={`text-lg font-mono mb-6 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          Reading not found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-mono font-bold text-[#FF5500] border-[#FF5500]/40 hover:bg-[#FF5500]/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const htmlContent = renderMarkdownWithMath(post.content);

  return (
    <article className="px-4 sm:px-8 py-10 sm:py-14 max-w-3xl mx-auto animate-fade-in">
      {/* Back Navigation */}
      <Link
        to="/"
        className={`inline-flex items-center gap-2 text-xs font-mono font-semibold mb-8 px-3.5 py-2 rounded-xl border transition-all group ${
          isDark
            ? 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
            : 'bg-[#efe8db] hover:bg-[#e4ddd0] border-[#d8cfbe] text-stone-600 hover:text-stone-900 shadow-sm'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>All Readings</span>
      </Link>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-6">
        <span
          className={`font-semibold px-3 py-1 rounded-full border ${
            isDark ? 'bg-zinc-900 border-zinc-800 text-[#FF5500]' : 'bg-[#eae3d5] border-[#c8bca8] text-amber-800'
          }`}
        >
          {post.topic}
        </span>
        <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
          <Clock className="w-3.5 h-3.5" />
          {post.readingTime}
        </span>
        <span className={isDark ? 'text-zinc-500' : 'text-stone-500'}>• {post.date}</span>
      </div>

      {/* Title */}
      <h1 className={`text-3xl sm:text-4xl md:text-[2.75rem] font-serif font-bold tracking-tight leading-tight mb-6 ${
        isDark ? 'text-white' : 'text-stone-900'
      }`}>
        {post.title}
      </h1>

      {/* Summary / Lede */}
      <p className={`text-base sm:text-lg leading-relaxed font-sans mb-8 pb-8 border-b ${
        isDark ? 'text-zinc-300 border-zinc-800/60' : 'text-stone-700 border-[#d8cfbe]'
      }`}
        dangerouslySetInnerHTML={{ __html: renderInlineMath(post.summary) }}
      />

      {/* Reference Paper Banner */}
      {post.paperTitle && (
        <div className={`p-5 rounded-2xl border mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono ${
          isDark ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300' : 'bg-[#efe8db] border-[#c8bca8] text-stone-800'
        }`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <BookOpen className="w-4 h-4 text-[#FF5500] shrink-0" />
            <span className="truncate font-semibold">{post.paperTitle}</span>
          </div>
          {post.paperUrl && (
            <a
              href={post.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#FF5500] font-bold shrink-0 hover:underline"
            >
              <span>Read Original Paper</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Key Takeaways */}
      <div className={`p-6 sm:p-7 rounded-2xl border mb-10 ${
        isDark
          ? 'bg-[#181614] border-amber-500/20 text-zinc-200'
          : 'bg-[#f4ebd9] border-amber-600/20 text-stone-900'
      }`}>
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500] mb-4">
          <Tag className="w-4 h-4" />
          <span>Key Weekend Takeaways</span>
        </div>
        <ul className="space-y-3">
          {post.takeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm font-sans leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: renderInlineMath(point) }} />
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`markdown-content text-[0.95rem] sm:text-base leading-relaxed ${
          isDark ? 'text-zinc-300' : 'text-stone-800'
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Bottom Navigation */}
      <div className={`mt-12 pt-8 border-t ${isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'}`}>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-sm font-mono font-bold px-5 py-2.5 rounded-xl border transition-all group ${
            isDark
              ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-[#FF5500]'
              : 'bg-[#efe8db] hover:bg-[#e4ddd0] border-[#d8cfbe] text-stone-700 hover:text-[#FF5500] shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All Readings</span>
        </Link>
      </div>
    </article>
  );
};
