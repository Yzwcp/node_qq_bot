import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {    // 与tsconfig.json的paths对应
        find: "@",
        replacement: resolve(__dirname, 'src')
      }
    ]
  }
})