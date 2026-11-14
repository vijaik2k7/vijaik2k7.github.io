import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft } from 'lucide-react';
import { ThemeMode } from '../types';
import { posts } from '../writing/posts';

interface PostPageProps {
  theme: ThemeMode;
}

export const PostPage: React.FC<PostPageProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);
  const html = useMemo(() => (post ? (marked.parse(post.body, { async: false }) as string) : ''), [post]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) document.title = `${post.title} — Vijai Rangan`;
    return () => {
      document.title = 'Vijai Rangan';
    };
  }, [post]);

  const backLink = (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 text-xs font-mono font-semibold px-3.5 py-2 rounded-xl border transition-all group ${
        isDark
          ? 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 text-zinc-400 hover:text-white'
          : 'bg-[#f4efe6] hover:bg-[#e4ddd0] border-[#d8cfbe] text-stone-600 hover:text-stone-900 shadow-sm'
      }`}
    >
      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
      <span>Home</span>
    </Link>
  );

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 py-20 max-w-3xl mx-auto text-center">
        <p className={`text-lg font-mono ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>Not found.</p>
        {backLink}
      </div>
    );
  }

  return (
    <article className="px-4 sm:px-8 py-10 sm:py-14 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-10">{backLink}</div>

      <h1 className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight leading-tight mb-4 ${
        isDark ? 'text-white' : 'text-stone-900'
      }`}>
        {post.title}
      </h1>

      <p className={`text-xs font-mono mb-10 pb-8 border-b ${
        isDark ? 'text-zinc-400 border-zinc-800/60' : 'text-stone-600 border-[#d8cfbe]'
      }`}>
        {post.date} • {post.minutes} min read
      </p>

      <div
        className={`markdown-content article text-[1.0625rem] ${isDark ? 'text-zinc-300' : 'text-stone-800'}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className={`mt-12 pt-8 border-t ${isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'}`}>{backLink}</div>
    </article>
  );
};
