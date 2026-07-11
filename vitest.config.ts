import { defineConfig } from 'vitest/config'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { resolve, join } from 'path'
import { playwright } from '@vitest/browser-playwright'

const SDK_ROOT = resolve(__dirname, '../reifydb/pkg/typescript')
const useLocalSdk = process.env.VITE_LOCAL_SDK === '1'

const localReifydbAliases = useLocalSdk
  ? [
      { find: /^@reifydb\/core$/, replacement: join(SDK_ROOT, 'core/src/index.ts') },
      { find: /^@reifydb\/wasm$/, replacement: join(SDK_ROOT, 'wasm/src/index.ts') },
    ]
  : []

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
  ],
  resolve: {
    alias: [
      ...localReifydbAliases,
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  test: {
    include: ['src/**/*.test.ts'],
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
