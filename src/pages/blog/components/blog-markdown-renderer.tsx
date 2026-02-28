import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { ExecutableSnippet } from '@/components/ui';

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(getTextContent).join('');
  if (typeof node === 'object' && 'props' in node)
    return getTextContent((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  return '';
}

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-10 mb-4 text-text-primary">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-8 mb-3 text-text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-6 mb-2 text-text-primary">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold mt-4 mb-2 text-text-primary">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-text-secondary leading-relaxed mb-4">{children}</p>
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
    <ul className="list-disc pl-6 mb-4 space-y-1 text-text-secondary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1 text-text-secondary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-dashed border-primary/50 pl-4 my-4 italic text-text-muted">
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
        <div className="my-4 border-2 border-dashed border-white/15 overflow-hidden bg-bg-tertiary">
          {lang && (
            <div className="px-4 py-2 text-xs font-mono text-text-muted border-b border-dashed border-white/15 bg-bg-elevated">
              {lang}
            </div>
          )}
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-text-secondary">
              {children}
            </code>
          </pre>
        </div>
      );
    }
    return (
      <code className="bg-bg-tertiary border border-dashed border-white/15 px-1.5 py-0.5 font-mono text-sm text-primary-light">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto border-2 border-dashed border-white/15">
      <table className="w-full text-sm text-text-secondary">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-elevated text-text-primary">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold border-b border-dashed border-white/15">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-b border-dashed border-white/15">{children}</td>
  ),
  hr: () => <hr className="my-8 border-dashed border-white/15" />,
  strong: ({ children }) => (
    <strong className="font-bold text-text-primary">{children}</strong>
  ),
};

interface BlogMarkdownRendererProps {
  content: string;
}

export function BlogMarkdownRenderer({ content }: BlogMarkdownRendererProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </Markdown>
  );
}
