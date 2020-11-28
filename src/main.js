import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//font and icon
import "@/assets/fonts/font.css";
import icon from "@/components/icon/AbiIcon.vue";
//cooike设置
import { isCookie, getCookie } from "@/utility/cookie";
if (isCookie("u_t")) {
  store.dispatch("logined", getCookie("u_t"));
}
createApp(App)
  .component("AbiIcon", icon)
  .use(store)
  .use(router)
  .mount("#app");
