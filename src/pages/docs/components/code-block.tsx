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
    <div className={cn('bg-[#f3f2fb] overflow-hidden', className)}>
      <div className="flex justify-between items-center px-4 py-2">
        <span className="pixel-label uppercase text-code-text-muted">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-code-text-muted hover:text-primary transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-code-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}
