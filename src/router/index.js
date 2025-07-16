import { createRouter, createWebHistory } from "vue-router";

import SignInAcc from "../views/signInAcc.vue";
import registerAcc from "../views/registerAcc.vue";
import card from "../views/card.vue";
import homePage from "../views/homePage.vue";
import modal from "../views/modal.vue";
const routes = [
  { path: "/", redirect: "/registerAcc" },
  { path: "/signInAcc", name: "signInAcc", component: SignInAcc },
  { path: "/registerAcc", name: "registerAcc", component: registerAcc },
  { path: "/card", name: "card", component: card },
  { path: "/homePage", name: "homePage", component: homePage },
  { path: "/modal", name: "modal", component: modal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
