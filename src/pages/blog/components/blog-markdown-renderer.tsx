import { useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { ExecutableSnippet } from '@/components/ui';
import type { BlogPostHeading } from '@/data/blog-data';

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (typeof node === 'object' && 'props' in node)
    return getTextContent((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  return '';
}

const measure = 'max-w-[68ch]';
const prose = 'text-[1.0625rem] leading-[1.75] text-text-primary';
const shadowHard = 'shadow-[4px_4px_0_var(--color-border-default)]';
const opener = [
  '[&>p:first-child]:font-medium',
  "[&>p:first-child]:before:content-['00']",
  '[&>p:first-child]:before:block',
  '[&>p:first-child]:before:font-mono',
  '[&>p:first-child]:before:text-sm',
  '[&>p:first-child]:before:font-semibold',
  '[&>p:first-child]:before:tracking-[1.4px]',
  '[&>p:first-child]:before:text-primary',
  '[&>p:first-child]:before:mb-2',
].join(' ');

function createComponents(headings: BlogPostHeading[]): Components {
  return {
    h1: ({ children }) => (
      <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-14 first:mt-0 mb-6 text-text-primary">
        {children}
      </h1>
    ),
    h2: ({ children }) => {
      const index = headings.find(
        (heading) => heading.text === getTextContent(children)
      )?.index;
      return (
        <h2 className="mt-14 first:mt-0 mb-5">
          {index && (
            <span
              className="block font-mono text-sm label-uppercase text-primary mb-2"
              data-numeric
            >
              {index}
            </span>
          )}
          <span className="block text-lg sm:text-xl font-black text-text-primary">
            {children}
          </span>
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3
        className={`${measure} font-mono text-sm sm:text-base label-uppercase text-text-primary mt-10 mb-3`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className={`${measure} text-lg font-bold text-text-primary mt-8 mb-2`}>
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className={`${measure} ${prose} mb-6`}>{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:text-primary-light transition-colors duration-200 underline underline-offset-2"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul
        className={`${measure} ${prose} list-disc pl-6 mb-6 space-y-2 marker:text-primary`}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        className={`${measure} ${prose} list-decimal pl-6 mb-6 space-y-2 marker:text-primary`}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote
        className={`${measure} ${prose} ${shadowHard} border-2 border-l-8 border-border-default border-l-primary bg-bg-secondary p-6 my-10 [&>p:last-child]:mb-0`}
      >
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const isBlock = className?.startsWith('language-');
      if (className === 'language-rql') {
        const code = getTextContent(children).trim();
        return <ExecutableSnippet initialCode={code} />;
      }
      if (isBlock) {
        const lang = className?.replace('language-', '') ?? '';
        return (
          <div
            className={`my-10 border-2 border-border-default overflow-hidden bg-code-bg ${shadowHard}`}
          >
            {lang && (
              <div className="px-4 py-2 text-xs font-mono label-uppercase text-code-text-muted border-b-2 border-border-default bg-code-bg-elevated">
                {lang}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-code-text">
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return (
        <code className="bg-bg-tertiary border border-border-default px-1.5 py-0.5 font-mono text-[0.9em] text-primary-light">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    table: ({ children }) => (
      <div
        className={`my-10 overflow-x-auto border-2 border-border-default ${shadowHard}`}
      >
        <table className="w-full text-sm text-text-secondary">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-bg-elevated text-text-primary">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-mono text-xs label-uppercase border-b-2 border-border-default">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-border-default">{children}</td>
    ),
    hr: () => <hr className="my-12 border-0 border-t-2 border-border-default" />,
    strong: ({ children }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),
  };
}

interface BlogMarkdownRendererProps {
  content: string;
  headings: BlogPostHeading[];
}

export function BlogMarkdownRenderer({
  content,
  headings,
}: BlogMarkdownRendererProps) {
  const components = useMemo(() => createComponents(headings), [headings]);

  return (
    <div className={opener}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
