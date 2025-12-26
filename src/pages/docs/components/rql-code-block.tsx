import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
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
    <div className={cn('border-2 border-border-default bg-white overflow-hidden', className)}>
      <div className="flex justify-between items-center px-4 py-2 border-b-2 border-border-default bg-bg-tertiary">
        <span className="text-xs font-bold text-primary-color uppercase tracking-wider">
          RQL
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-border-default hover:text-white transition-colors border border-transparent hover:border-border-default"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <CodeViewer code={code} />
    </div>
  );
}
