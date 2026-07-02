import { Navbar } from '@/components/layout/navbar';
import { Console } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { brutalist_light_theme } from '@reifydb/console';

export function PlaygroundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div style={{ height: 'calc(100vh - 60px)' }}>
        <Console
          executor={wasmExecutor}
          initial_code="FROM app::users"
          history_key="playground"
          theme="light"
          monaco_theme={brutalist_light_theme}
        />
      </div>
    </div>
  );
}
