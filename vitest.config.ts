import { defineConfig } from 'vitest/config'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { resolve } from 'path'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
  optimizeDeps: {
    exclude: ['@/lib/wasm'],
  },
})
