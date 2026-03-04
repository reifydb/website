import { Snippet } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';

interface ExecutableSnippetProps {
  initialCode: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ExecutableSnippet({
  initialCode,
  title,
  description,
  className,
}: ExecutableSnippetProps) {
  return (
    <Snippet
      executor={wasmExecutor}
      initialCode={initialCode}
      title={title}
      description={description}
      className={className}
    />
  );
}
