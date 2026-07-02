import { Snippet } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { brutalist_light_theme } from '@reifydb/console';

interface ExecutableSnippetProps {
  initialCode: string;
  title?: string;
  description?: string;
  className?: string;
  readonly?: boolean;
}

export function ExecutableSnippet({
  initialCode,
  title,
  description,
  className,
  readonly,
}: ExecutableSnippetProps) {
  return (
    <div className={className}>
      <Snippet
        executor={wasmExecutor}
        initial_code={initialCode}
        title={title}
        description={description}
        theme="light"
        monaco_theme={brutalist_light_theme}
        readonly={readonly}
      />
    </div>
  );
}
