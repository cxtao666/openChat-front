import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'
const isProd = process.env.NODE_ENV === 'production'

// 自己写个vite插件对链接进行处理
const addPrefixPlugin = (prefix) => ({
  name: 'add-prefix-plugin',
  async transformIndexHtml(html) {
    return html.replace(/(href|src)="(?!http|\/\/)/g, `$1="${prefix}`).replace(/import\('(.+)'\)/, `import('${prefix}$1')`);
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    qiankun('doc', {
      useDevMode: true
    }),
    addPrefixPlugin(isProd ? '/doc' : '')
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
