import { createRouter, createWebHistory } from "vue-router";

import card from "../views/card.vue";
import homePage from "../views/homePage.vue";
import modal from "../views/modal.vue";
import orderProduct from "../views/order_product.vue";
import customer_receipt from "../views/customer_receipt.vue";
import size_guide from "../views/Size_Guide_Modal.vue";
import footer from "../components/footer.vue";
import Registration from "../views/mod/Registration_user.vue";
import AuthView from "../views/mod/AuthView.vue";
import check_out from "/src/views/mod/AuthModal.vue"; // Assuming you have a check_out.vue file
import categories from "../views/categories/cate_demo.vue";
import category_detail from "../views/categories/cate_detail.vue";
import add_favorite from "../views/categories/add_favorite.vue";
import SearchResults from "../views/categories/SearchResults.vue";
const routes = [
  { path: "/", name: "homePage", component: homePage },
  { path: "/card", name: "card", component: card },
  { path: "/modal", name: "modal", component: modal },
  { path: "/order_product", name: "orderProduct", component: orderProduct },
  {
    path: "/customer_receipt",
    name: "customer_receipt",
    component: customer_receipt,
  },
  { path: "/Registration", name: "Registration", component: Registration },
  { path: "/AuthView", name: "AuthView", component: AuthView },
  { path: "/check_out", name: "check_out", component: check_out },
  { path: "/size_guide", name: "size_guide", component: size_guide },
  { path: "/categories", name: "categories", component: categories },
  { path: "/add_favorite", name: "add_favorite", component: add_favorite },
  {
    path: "/category_detail",
    name: "category-detail",
    component: category_detail,
  },
  { path: "/SearchResults", name: "SearchResults", component: SearchResults },
  { path: "/footer", name: "footer", component: footer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
