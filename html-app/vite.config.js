import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
    plugins: [
        qiankun('phtml', {
            useDevMode: true
        })
    ],
    server: {
        port: 3003
    }
})