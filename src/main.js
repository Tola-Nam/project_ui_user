// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";

import * as lucide from "lucide-vue-next";

const app = createApp(App);

// Register all Lucide icons globally
for (const [key, component] of Object.entries(lucide)) {
  app.component(key, component);
}

app.use(router);
app.mount("#app");
