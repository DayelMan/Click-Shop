<template>
  <footer class="footer" id="contacts">
    <div class="container footer__content">
      <div class="footer__content-logo">
        <img src="../assets/img/logofooter.svg" alt="" />
      </div>
      <div class="footer__content-links">
        
        <div class="footer__content-item-items">
          <ul class="footer__content-item">
            <router-link to="/">Home</router-link>
            <router-link to="/trash">Product card</router-link>
          </ul>
        </div>
        <div class="footer__content-item-payment">
          <ul class="footer__content-item">
            <router-link to="/payment">Payment and delivery</router-link>
            <router-link to="/Like">Like</router-link>
          </ul>
        </div>
        <div class="footer__content-item-contacts">
          <h3 class="footer__content-item-contacts-title">Contacts</h3>
          <ul class="">
            <li>
              <img
                src="../assets/img/location.png"
                alt="location"
                style="height: 24px"
              />
              <a href="#!" class="oul"
                >70 West Buckingham Ave. Farmingdale, NY 11735</a
              >
            </li>

            <li>
              <img src="../assets/img/phone.png" alt="location" />
              <a href="tel:+88 01911 717 490">+88 01911 717 490</a>
            </li>
            <li>
              <img src="../assets/img/email.png" alt="location" />
              <a href="email:contact@sportdriven.com"
                >contact@sportdriven.com</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from "vue";

const items = ref([
  {
    id: 1,
    content: "Home",
    path: "/",
  },
  {
    id: 2,
    content: "Product card",
    path: "/trash",
  },
]);
</script>
