import { Snippet } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { premium_dark_theme } from '@reifydb/console';
import { cn } from '@/lib';

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
    <div className={cn('overflow-hidden', className)}>
      <Snippet
        executor={wasmExecutor}
        initial_code={initialCode}
        title={title}
        description={description}
        theme="dark"
        monaco_theme={premium_dark_theme}
      />
    </div>
  );
}
