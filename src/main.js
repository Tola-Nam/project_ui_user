// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // ✅ Import router
import { Eye } from "lucide-vue-next";

const app = createApp(App);

app.use(router);
app.component("Eye", Eye);
app.mount("#app");
