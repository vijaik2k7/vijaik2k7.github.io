import React, { useEffect } from 'react';
import { X, ExternalLink, BookOpen, Clock, Tag, CheckCircle2 } from 'lucide-react';
import { ReadingPost, ThemeMode } from '../types';
import { renderMarkdownWithMath, renderInlineMath } from '../utils/renderMarkdown';

interface ReadingModalProps {
  post: ReadingPost | null;
  theme: ThemeMode;
  onClose: () => void;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({ post, theme, onClose }) => {
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const htmlContent = renderMarkdownWithMath(post.content);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border shadow-2xl transition-all p-6 sm:p-10 ${
          isDark
            ? 'bg-[#121215] border-zinc-800 text-zinc-100 selection:bg-[#FF5500] selection:text-white'
            : 'bg-[#faf6f0] border-[#d8cfbe] text-stone-900 selection:bg-[#FF5500] selection:text-white'
        }`}
      >
        {/* Top Navigation / Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800/30 dark:border-zinc-800/60 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
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

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
                : 'bg-[#eae3d5] hover:bg-[#dcd3c2] border-[#c8bca8] text-stone-700 hover:text-stone-900'
            }`}
            title="Close (Esc)"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4 leading-tight">
          {post.title}
        </h2>

        {/* Reference Paper Banner */}
        {post.paperTitle && (
          <div className={`p-4 rounded-2xl border mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono ${
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
                className="inline-flex items-center gap-1 text-[#FF5500] font-bold shrink-0 hover:underline"
              >
                <span>Read Original Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Key Takeaways Callout Card */}
        <div className={`p-5 sm:p-6 rounded-2xl border mb-8 ${
          isDark
            ? 'bg-[#181614] border-amber-500/20 text-zinc-200'
            : 'bg-[#f4ebd9] border-amber-600/20 text-stone-900'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500] mb-3">
            <Tag className="w-4 h-4" />
            <span>Key Weekend Takeaways</span>
          </div>
          <ul className="space-y-2.5">
            {post.takeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: renderInlineMath(point) }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Main Writeup Content (Formatted HTML) */}
        <div
          className={`markdown-content text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-stone-800'
          }`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};
