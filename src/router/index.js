import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProductCard from "@/views/Demo.vue";
import Like from "@/views/Like.vue";
import trash from "@/views/Trash.vue";
import payment from "@/views/Payment.vue";

const roters = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    {
      path: "/productCard/:id",
      name: "ProductCard",
      component: ProductCard,
    },
    {
      path: "/Like",
      name: "Likes",
      component: Like,
    },
    {
      path: "/trash",
      name: "Trash",
      component: trash,
    },
    {
      path: "/payment",
      name: "payment",
      component: payment,
    },
  ],
});

export default roters;
