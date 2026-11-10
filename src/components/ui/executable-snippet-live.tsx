import '@/lib/monaco-setup';
import { Snippet, reifydbLightTheme } from '@reifydb/editor';
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
      initialCode={initialCode}
      title={title}
      description={description}
      theme="reifydb"
      monacoTheme={reifydbLightTheme}
      readonly={readonly}
      className={readonly ? 'rdb-snippet--static' : undefined}
    />
  );
}
