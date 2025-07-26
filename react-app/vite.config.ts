import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig({
  base: '/react',
  server: {
    hmr: false, // 确保未设置为 false
    port: 3001,
    cors: true,
    origin: 'http://localhost:3001'
  },
  plugins: [
    react(),
    qiankun('react', {
      useDevMode: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // 避免全局变量冲突（可选）
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  }
})
