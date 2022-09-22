import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.less";
import { service } from "./network/axios";
import pinia from "./store/index";
const app = createApp(App);
app.config.globalProperties.$axios = service;

app.use(pinia).use(router).mount("#app");
