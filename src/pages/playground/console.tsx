import '@/lib/monaco-setup';
import { Console, reifydb_light_theme } from '@reifydb/console';
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
      auto_run
      history_key="playground"
      theme="reifydb"
      monaco_theme={reifydb_light_theme}
      catalog_placement="sidebar"
      catalog_expanded={CATALOG_EXPANDED}
      catalog_namespaces={CATALOG_NAMESPACES}
    />
  );
}
