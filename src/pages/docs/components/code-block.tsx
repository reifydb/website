import { useState } from 'react';
import { cn } from '@/lib';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'bash', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('border-2 border-dashed border-white/15 bg-bg-tertiary overflow-hidden', className)}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-dashed border-white/15 bg-bg-elevated">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-muted hover:text-primary transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          <span className="font-mono text-xs">{copied ? '[ok]' : '[cp]'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-text-primary">
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface TabbedCodeBlockProps {
  examples: {
    language: string;
    label: string;
    code: string;
  }[];
  className?: string;
}

export function TabbedCodeBlock({ examples, className }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(examples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('border-2 border-dashed border-white/15 bg-bg-tertiary overflow-hidden', className)}>
      <div className="flex items-center justify-between border-b border-dashed border-white/15 bg-bg-elevated">
        <div className="flex">
          {examples.map((example, index) => (
            <button
              key={example.language}
              onClick={() => setActiveTab(index)}
              className={cn(
                'px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors border-r border-dashed border-white/15',
                activeTab === index
                  ? 'bg-primary text-bg-primary'
                  : 'text-text-muted hover:text-text-primary'
              )}
            >
              {example.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center mr-2 text-text-muted hover:text-primary transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          <span className="font-mono text-xs">{copied ? '[ok]' : '[cp]'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-text-primary">
        <code>{examples[activeTab].code}</code>
      </pre>
    </div>
  );
}
