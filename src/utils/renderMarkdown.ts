import { marked } from 'marked';
import katex from 'katex';

/**
 * Renders LaTeX math ($...$ and $$...$$) using KaTeX, then parses markdown to HTML.
 */
export function renderMarkdownWithMath(text: string): string {
  if (!text) return '';

  // 1. Render display math $$...$$
  let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return `<div class="my-4 text-center overflow-x-auto">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
    } catch {
      return math;
    }
  });

  // 2. Render inline math $...$
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return math;
    }
  });

  // 3. Parse Markdown using marked
  try {
    return marked.parse(processed, { async: false }) as string;
  } catch {
    return processed;
  }
}

/**
 * Renders inline text with KaTeX math (for takeaway bullet points & short text)
 */
export function renderInlineMath(text: string): string {
  if (!text) return '';
  return text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
      return math;
    }
  });
}
