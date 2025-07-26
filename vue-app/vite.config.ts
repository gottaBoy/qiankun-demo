import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue',
  server: {
    port: 3002,
    cors: true,
    origin: 'http://localhost:3002'
  },
  plugins: [
    vue(),
    qiankun('vue', {
      useDevMode: true
    })
  ],
})
