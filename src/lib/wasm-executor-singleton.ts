import { WasmExecutor } from '@reifydb/console';
import type { Executor, ExecutionResult } from '@reifydb/console';
import { getWasmDB, getWasmDBSync } from './wasm-db-singleton';

/**
 * A lazy executor that initializes the WASM database on first execute().
 * Wraps the singleton so that multiple Snippet components share one DB instance.
 */
class LazyWasmExecutor implements Executor {
  private inner: WasmExecutor | null = null;
  private initializing: Promise<WasmExecutor> | null = null;

  private async getExecutor(): Promise<WasmExecutor> {
    if (this.inner) return this.inner;

    // Check if already initialized
    const sync = getWasmDBSync();
    if (sync) {
      this.inner = new WasmExecutor(sync);
      return this.inner;
    }

    // Lazy init with dedup
    if (!this.initializing) {
      this.initializing = getWasmDB().then(db => {
        this.inner = new WasmExecutor(db);
        this.initializing = null;
        return this.inner;
      });
    }
    return this.initializing;
  }

  async execute(statement: string): Promise<ExecutionResult> {
    const exec = await this.getExecutor();
    return exec.execute(statement);
  }

}

export const wasmExecutor = new LazyWasmExecutor();
