import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
//自动引入ElementPlus的组件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//自动引入vue的api
import autoImport from 'unplugin-auto-import/vite';

function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      // {
      //   'vuex': ['useStore']
      // }
    ],
    resolvers: [ElementPlusResolver()],
    dts: false
  })
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({ resolvers: [ElementPlusResolver()] }), createAutoImport()],
  publicPath: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  }
})
