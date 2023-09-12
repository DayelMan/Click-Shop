import { createApp, ref } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import roters from "./router/index.js";
import "@/assets/styles/scss/main.scss";
import NavbarVue from "./components/Navbar.vue";

const app = createApp(App);
app.use(createPinia());
app.use(roters);
app.mount("#app");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.querySelector(".nav").classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger").addEventListener("click", function () {
    document.body.style.overflow = 'visible'
  });
});

// Закрыть меню при нажатии на Esc
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Действие при клике
    document.querySelector(".nav").classList.remove("open");
  }
}); 

// Закрыть меню при клике вне его
document.getElementById("menu").addEventListerner("click", (event) => {
  event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener("click", (event) => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener("click", (event) => {
  if (event._isClickWithInMenu) return;
  // Действие при клике
  document.querySelector(".nav").classList.remove("open");
});
