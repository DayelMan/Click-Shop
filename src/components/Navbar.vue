<template>
  <nav class="nav">
    <div class="nav__content container" >
      <button class="header__burger-btn" id="burger" @click="burgerOn">
        <span></span><span ></span><span></span>
      </button>
      <router-link to="/" class="logo"
        ><img src="../assets/img/logo.svg" alt="logo"
      /></router-link>
      <div class="menu" id="menu" :class="{ activeesa: burger }">
        <ul class="nav__content-ul">
          <li class="nav__content-li">
            <routerLink class="nav__content-li" to="/">Home</routerLink>
          </li>
          <li class="nav__content-li">
            <routerLink class="nav__content-li" to="/Like"
              >Like Product</routerLink
            >
          </li>
          <li class="nav__content-li">
            <routerLink class="nav__content-li" to="/payment"
              >Payment and delivery</routerLink
            >
          </li>
          <li class="nav__content-li">
            <a href="#contacts" class="nav__content-li">Contacts</a>
          </li>
        </ul>
        <div class="nav__content-trash"></div>
      </div>

      <div class="nav__content-trash">
        <router-link to="/trash" style="position: relative">
          <img src="../assets/img/cart.svg" alt="trash" />
          <span class="basket__span" v-show="trashOpen">{{
            totalQuantity != NaN ? totalQuantity : 0
          }}</span>
        </router-link>
      </div>

    </div>
  </nav>
  
  
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useProductStore } from "../stores/products.js";
const productStore = useProductStore();
const totalQuantity = computed(() => productStore.getTotalProducts);

// const isActive = (targetPath) => {
//   return computed(() => {
//     return route.path === targetPath;
//   });
//   return {isActive};
// };


const burger = ref(false)

const burgerOff = () => {
    burger.value = false
    document.body.style.height = 'auto'
    document.body.style.overflow = 'visible'
}

const burgerOn = () => {
    burger.value = true
    // document.body.style.height = '100vh'
    document.body.style.overflow = 'hidden'
}

// onMounted(() => {
//     document.addEventListener("click", burgerOff);
// });

// onUnmounted(() => {
//     document.removeEventListener("click", burgerOff);
// });

const trashOpen = ref(totalQuantity != true ? totalQuantity : false);
</script>

<style lang="scss" scoped>

</style>
