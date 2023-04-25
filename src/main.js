import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
// import ElementPlus from 'element-plus';
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import * as echarts from "echarts";

import "./style/index.less";
import "./style/common.less";

import api from "./api/index.js";
const app = createApp(App);
// 注册Icons 全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})

app.config.globalProperties.$api = api;
app.config.globalProperties.$echarts = echarts;

// app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.mount('#app')

