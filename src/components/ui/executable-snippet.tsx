import { Snippet } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { premiumDarkTheme } from '@reifydb/console';
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
    <div className={cn('rounded-lg overflow-hidden glass-card-strong', className)}>
      <Snippet
        executor={wasmExecutor}
        initialCode={initialCode}
        title={title}
        description={description}
        theme="dark"
        monacoTheme={premiumDarkTheme}
      />
    </div>
  );
}
