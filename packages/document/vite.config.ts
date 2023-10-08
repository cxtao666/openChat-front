import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from "vite-plugin-qiankun"
const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsDir: 'assets', // 资源文件的输出目录
    assetsPublicPath: '/doc/', // 资源文件的 URL 前缀
  },
  plugins: [
    vue(),
    vueJsx(),
    qiankun('doc', {
      useDevMode: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
