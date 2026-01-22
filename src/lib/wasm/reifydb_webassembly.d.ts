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
     * Execute a command (DDL/DML) and return results
     *
     * Commands include CREATE, INSERT, UPDATE, DELETE, etc.
     *
     * # Example
     *
     * ```javascript
     * await db.command("CREATE NAMESPACE demo");
     * await db.command(`
     *   CREATE TABLE demo.users {
     *     id: int4,
     *     name: utf8
     *   }
     * `);
     * ```
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
