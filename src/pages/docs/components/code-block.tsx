import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
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
    <div className={cn('border-2 border-border-default bg-white', className)}>
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-border-default bg-bg-tertiary">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
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
    <div className={cn('border-2 border-border-default bg-white', className)}>
      <div className="flex items-center justify-between border-b-2 border-border-default bg-bg-tertiary">
        <div className="flex">
          {examples.map((example, index) => (
            <button
              key={example.language}
              onClick={() => setActiveTab(index)}
              className={cn(
                'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-r-2 border-border-default',
                activeTab === index
                  ? 'bg-primary-color text-white'
                  : 'text-text-muted hover:text-primary-color hover:bg-bg-secondary'
              )}
            >
              {example.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="p-2 mr-2 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{examples[activeTab].code}</code>
      </pre>
    </div>
  );
}
