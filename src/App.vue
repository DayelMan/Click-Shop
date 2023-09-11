<template>
  <Navbar />
  <RouterView />
  <Footer />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { onMounted } from "vue";
// import { useProductStore } from "./stores/products";

</script>
