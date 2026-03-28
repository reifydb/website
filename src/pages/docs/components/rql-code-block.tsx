import { useState } from 'react';

import { CodeViewer } from '@/components/ui';
import { cn } from '@/lib';

interface RqlCodeBlockProps {
  code: string;
  className?: string;
}

export function RqlCodeBlock({ code, className }: RqlCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('border border-border-default rounded-lg bg-bg-secondary overflow-hidden', className)}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-border-default bg-bg-tertiary">
        <span className="text-xs font-bold text-primary-color uppercase tracking-wider">
          RQL
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 text-text-secondary hover:text-primary transition-colors"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          <span className="text-xs">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <CodeViewer code={code} />
    </div>
  );
}
