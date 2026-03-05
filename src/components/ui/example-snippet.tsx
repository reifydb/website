import { getExampleById } from '@/lib/examples';
import { ExecutableSnippet } from './executable-snippet';

interface ExampleSnippetProps {
  id: string;
  className?: string;
}

export function ExampleSnippet({ id, className }: ExampleSnippetProps) {
  const example = getExampleById(id);
  if (!example) throw new Error(`Example not found: ${id}`);
  return (
    <ExecutableSnippet
      title={example.title}
      initialCode={example.code}
      className={className}
    />
  );
}
