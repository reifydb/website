/**
 * Test setup file for Vitest
 * Ensures browser globals are available for WASM module
 */

// jsdom provides window, but we need to ensure it's globally available
// for the WASM module which expects window.setInterval, etc.
if (typeof globalThis.window === 'undefined') {
  // @ts-expect-error - setting up globals for WASM
  globalThis.window = globalThis;
}
