import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeMode } from '../types';
import { posts } from '../writing/posts';

interface WritingProps {
  theme: ThemeMode;
}

export const Writing: React.FC<WritingProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="writing"
      className={`py-12 px-4 sm:px-8 max-w-4xl mx-auto border-t ${
        isDark ? 'border-zinc-800/60' : 'border-[#d8cfbe]'
      }`}
    >
      <h2 className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-8 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        Writing
      </h2>

      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/writing/${post.slug}`}
              className={`block border rounded-2xl p-5 transition-all duration-200 group hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#121215] hover:bg-[#18181c] border-zinc-800 hover:border-[#FF5500]/50'
                  : 'bg-[#f5f0e6] hover:bg-[#eae3d5] border-[#d8cfbe] hover:border-[#FF5500] shadow-sm'
              }`}
            >
              <h3 className={`font-serif font-bold text-lg leading-snug mb-2 group-hover:text-[#FF5500] transition-colors ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                {post.title}
              </h3>
              <p className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-stone-600'}`}>
                {post.date} • {post.minutes} min read
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
