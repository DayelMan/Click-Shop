import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import ProductCard from "@/views/Demo.vue"

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
        component: () =>
            import(
              "@/views/Like.vue"
            ),
      },
      {
        path: "/trash",
        name: "Trash",
        component: () =>
            import(
              "@/views/Trash.vue"
            ),
      },
      {
        path: "/payment",
        name: "payment",
        component: () =>
            import(
              "@/views/Payment.vue"
            ),
      },
  ],
});

export default roters;