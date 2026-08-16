import { defineConfig } from 'tsdown'

/**
 * The desktop client ships two bundles beside the tsc-emitted tree: the npm
 * `bin` launcher (`bin.js`) and the Electron main entry (`main.js`) the
 * launcher passes to the electron binary. `electron` stays an external
 * dependency; both bundles stay ESM because the package is `type: module`.
 */
export default defineConfig({
  entry: ['lib/types/bin.js', 'lib/types/main.js'],
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
})
