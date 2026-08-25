import '@/lib/monaco-setup';
import { Snippet, reifydb_light_theme } from '@reifydb/console';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';

interface ExecutableSnippetLiveProps {
  initialCode: string;
  title?: string;
  description?: string;
  readonly?: boolean;
}

export default function ExecutableSnippetLive({
  initialCode,
  title,
  description,
  readonly,
}: ExecutableSnippetLiveProps) {
  return (
    <Snippet
      executor={wasmExecutor}
      initial_code={initialCode}
      title={title}
      description={description}
      theme="reifydb"
      monaco_theme={reifydb_light_theme}
      readonly={readonly}
    />
  );
}
