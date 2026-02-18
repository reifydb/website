/* tslint:disable */
/* eslint-disable */

/**
 * JavaScript-compatible error wrapper
 */
export class JsError {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Get the error message
     */
    readonly message: string;
}

/**
 * WebAssembly ReifyDB Engine
 *
 * Provides an in-memory query engine that runs entirely in the browser.
 * All data is stored in memory and lost when the page is closed.
 */
export class WasmDB {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Execute an admin operation (DDL + DML + Query) and return results
     *
     * Admin operations include CREATE, ALTER, INSERT, UPDATE, DELETE, etc.
     *
     * # Example
     *
     * ```javascript
     * await db.admin("CREATE NAMESPACE demo");
     * await db.admin(`
     *   CREATE TABLE demo.users {
     *     id: int4,
     *     name: utf8
     *   }
     * `);
     * ```
     */
    admin(rql: string): any;
    /**
     * Execute admin with JSON parameters
     */
    adminWithParams(rql: string, params_js: any): any;
    /**
     * Execute a command (DML) and return results
     *
     * Commands include INSERT, UPDATE, DELETE, etc.
     * For DDL operations (CREATE, ALTER), use `admin()` instead.
     */
    command(rql: string): any;
    /**
     * Execute command with JSON parameters
     */
    commandWithParams(rql: string, params_js: any): any;
    /**
     * Create a new in-memory ReifyDB engine
     *
     * # Example
     *
     * ```javascript
     * import init, { WasmDB } from './pkg/reifydb_engine_wasm.js';
     *
     * await init();
     * const db = new WasmDB();
     * ```
     */
    constructor();
    /**
     * Execute a query and return results as JavaScript objects
     *
     * # Example
     *
     * ```javascript
     * const results = await db.query(`
     *   FROM [{ name: "Alice", age: 30 }]
     *   FILTER age > 25
     * `);
     * console.log(results); // [{ name: "Alice", age: 30 }]
     * ```
     */
    query(rql: string): any;
    /**
     * Execute query with JSON parameters
     *
     * # Example
     *
     * ```javascript
     * const results = await db.queryWithParams(
     *   "FROM users FILTER age > $min_age",
     *   { min_age: 25 }
     * );
     * ```
     */
    queryWithParams(rql: string, params_js: any): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_wasmdb_free: (a: number, b: number) => void;
    readonly wasmdb_admin: (a: number, b: number, c: number) => [number, number, number];
    readonly wasmdb_adminWithParams: (a: number, b: number, c: number, d: any) => [number, number, number];
    readonly wasmdb_command: (a: number, b: number, c: number) => [number, number, number];
    readonly wasmdb_commandWithParams: (a: number, b: number, c: number, d: any) => [number, number, number];
    readonly wasmdb_new: () => [number, number, number];
    readonly wasmdb_query: (a: number, b: number, c: number) => [number, number, number];
    readonly wasmdb_queryWithParams: (a: number, b: number, c: number, d: any) => [number, number, number];
    readonly __wbg_jserror_free: (a: number, b: number) => void;
    readonly jserror_message: (a: number) => [number, number];
    readonly wasm_bindgen__closure__destroy__hc292d355262a9450: (a: number, b: number) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h7187ad73b4efaec3: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
