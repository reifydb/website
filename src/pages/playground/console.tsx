import '@/lib/monaco-setup';
import { Console, brutalist_light_theme } from '@reifydb/console';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';

export default function PlaygroundConsole() {
  return (
    <Console
      executor={wasmExecutor}
      initial_code="FROM app::users"
      history_key="playground"
      theme="light"
      monaco_theme={brutalist_light_theme}
    />
  );
}
