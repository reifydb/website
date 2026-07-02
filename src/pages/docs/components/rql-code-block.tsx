import { ExecutableSnippet } from '@/components/ui';

interface RqlCodeBlockProps {
  code: string;
  className?: string;
}

export function RqlCodeBlock({ code, className }: RqlCodeBlockProps) {
  return (
    <ExecutableSnippet
      initialCode={code}
      title="RQL"
      readonly
      className={className}
    />
  );
}
