import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.less'
import axios from 'axios';
import { createPinia } from 'pinia'
const app = createApp(App)

axios.defaults.baseURL = "http://127.0.0.1:1125"
app.config.globalProperties.$axios = axios
app.use(createPinia()).use(router).use(ElementPlus).mount('#app')
