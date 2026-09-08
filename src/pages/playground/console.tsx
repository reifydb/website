import '@/lib/monaco-setup';
import { Console, reifydbLightTheme } from '@reifydb/editor';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';

const CATALOG_EXPANDED = ['app.tables'];
const CATALOG_NAMESPACES = ['app', 'system'];

interface PlaygroundConsoleProps {
  code: string;
}

export default function PlaygroundConsole({ code }: PlaygroundConsoleProps) {
  return (
    <Console
      executor={wasmExecutor}
      code={code}
      autoRun
      historyKey="playground"
      theme="reifydb"
      monacoTheme={reifydbLightTheme}
      catalogPlacement="sidebar"
      catalogExpanded={CATALOG_EXPANDED}
      catalogNamespaces={CATALOG_NAMESPACES}
    />
  );
}
