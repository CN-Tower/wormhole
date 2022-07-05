import { join } from 'path'
import { copySync } from 'fs-extra'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePluginElectronBuilder } from './plugin'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, 'src/render'),
  plugins: [
    vue(),
    VitePluginElectronBuilder({
      root: process.cwd(),
      preloadFile: join(__dirname, 'src/preload/index.ts'),
      tsconfig: './tsconfig.main.json',
      electronBuilderConfig: './electron-builder.config.js',
      external: [
        '@nestjs',
        'electron',
        'electron-log',
        'electron-store',
        'express',
        'rxjs',
        'node-fetch',
        'electron-updater',
        'glob',
        'fs-extra',
        'mkdirp',
        'url-parse'
      ],
      afterEsbuildBuild: async () => {
        copySync('src/main/assets', 'dist/main/assets')
      },
    }),
  ],
  resolve: {
    alias: {
      '@render': join(__dirname, 'src/render'),
      '@main': join(__dirname, 'src/main'),
      '@types': join(__dirname, 'src/types'),
    },
  },
  base: './',
  build: {
    outDir: join(__dirname, 'dist/render'),
    emptyOutDir: true,
  },
})
