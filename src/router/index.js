import { createRouter, createWebHistory } from "vue-router";

import SignInAcc from "../views/signInAcc.vue";
import registerAcc from "../views/registerAcc.vue";
import card from "../views/card.vue";
import homePage from "../views/homePage.vue";
import modal from "../views/modal.vue";
import orderProduct from "../views/order_product.vue";
import customer_receipt from "../views/customer_receipt.vue";
import size_guide from "../views/Size_Guide_Modal.vue";
import footer from "../components/footer.vue";
const routes = [
  // { path: "/", redirect: "/registerAcc" },
  // { path: "/signInAcc", name: "signInAcc", component: SignInAcc },
  // { path: "/registerAcc", name: "registerAcc", component: registerAcc },
  { path: "/", name: "homePage", component: homePage },
  { path: "/card", name: "card", component: card },
  { path: "/modal", name: "modal", component: modal },
  { path: "/order_product", name: "orderProduct", component: orderProduct },
  {
    path: "/customer_receipt",
    name: "customer_receipt",
    component: customer_receipt,
  },
  { path: "/size_guide", name: "size_guide", component: size_guide },
  { path: "/footer", name: "footer", component: footer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
