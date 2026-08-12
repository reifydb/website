import '@/lib/monaco-setup';
import { Snippet, brutalist_light_theme } from '@reifydb/console';
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
      theme="light"
      monaco_theme={brutalist_light_theme}
      readonly={readonly}
    />
  );
}
