import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { resolve, join } from 'path'

const SDK_ROOT = resolve(__dirname, '../reifydb/pkg/typescript')
const useLocalSdk = process.env.VITE_LOCAL_SDK === '1'

const localReifydbAliases = useLocalSdk
  ? [
      { find: /^@reifydb\/core$/, replacement: join(SDK_ROOT, 'core/src/index.ts') },
      { find: /^@reifydb\/ui$/, replacement: join(SDK_ROOT, 'ui/src/index.ts') },
      { find: /^@reifydb\/ui\/styles\.css$/, replacement: join(SDK_ROOT, 'ui/src/styles/index.css') },
      { find: /^@reifydb\/console$/, replacement: join(SDK_ROOT, 'console/src/index.ts') },
      { find: /^@reifydb\/console\/styles\.css$/, replacement: join(SDK_ROOT, 'console/dist/styles.css') },
      { find: /^@reifydb\/wasm$/, replacement: join(SDK_ROOT, 'wasm/src/index.ts') },
    ]
  : []

const ssrBuild = process.env.SSR_BUILD === '1'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: ssrBuild
    ? [react(), tailwindcss()]
    : [
        react(),
        tailwindcss(),
        wasm(),
        topLevelAwait(),
        cloudflare(
          command === 'serve' ? { configPath: './wrangler.dev.jsonc' } : undefined,
        ),
      ],
  build: ssrBuild
    ? {
        outDir: 'dist-ssr',
        emptyOutDir: true,
        ssr: 'src/entry-server.tsx',
        rollupOptions: { external: ['@reifydb/wasm', '@reifydb/console'] },
      }
    : {},
  ssr: {
    external: ['@reifydb/wasm', '@reifydb/console'],
    noExternal: [/^@reifydb\/(core|ui)$/, /^react-router/],
  },
  resolve: {
    alias: [
      ...localReifydbAliases,
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: 'react', replacement: resolve(__dirname, 'node_modules/react') },
      { find: 'react-dom', replacement: resolve(__dirname, 'node_modules/react-dom') },
    ],
  },
  optimizeDeps: {
    exclude: ['@reifydb/wasm'],
  },
}))
