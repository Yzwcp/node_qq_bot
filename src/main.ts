import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.less";
import pinia from "./store/index";
const app = createApp(App);
console.log(import.meta.env);

app.use(pinia).use(router).mount("#app");
