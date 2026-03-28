import { Navbar } from '@/components/layout/navbar';
import { Console } from '@reifydb/console';
import '@reifydb/console/styles.css';
import { wasmExecutor } from '@/lib/wasm-executor-singleton';
import { premiumDarkTheme } from '@reifydb/console';

export function PlaygroundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div style={{ height: 'calc(100vh - 60px)' }}>
        <Console
          executor={wasmExecutor}
          initialCode="FROM app::users"
          historyKey="playground"
          theme="dark"
          monacoTheme={premiumDarkTheme}
        />
      </div>
    </div>
  );
}
