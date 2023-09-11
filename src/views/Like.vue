<template>
  <div class="like container" v-if="likedProducts.length != 0">
    <RouterLink to="/" class="path">Home / <span>Like</span></RouterLink>

    <div class="extra__products">
      <div class="all__extra_products">
        <div class="extra__product" v-for="product in likedProducts">
          <RouterLink
            :to="`/productCard/${product.id}`"
            @click="openProduct(product.id)"
          >
            <img :src="product.thumbnail" alt="" />
          </RouterLink>
          <h2 class="extra__product-title">
            {{ product.title }}
          </h2>
          <p class="extra__product-price">{{ product.price }}.00$</p>
        </div>
      </div>
    </div>
  </div>

  <div class="else" v-else>
    <h1 class="bomj">
      У вас нету избранных товаров. <br />
      Не бойтесь тратить деньги. <br />
      Закажите товар от 'ClickShop'
    </h1>
    <a href="/#categories">Добавить товар в избранное</a>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductStore } from "../stores/products.js";
const productStore = useProductStore();

const likedProducts = computed(() => productStore.getLikedProducts);

// like product
function likeProduct(event, product) {
  event.target.classList.toggle("active");
  product.liked = !product.liked;
}

// add or delete product

function addOrDeleteProduct(product) {
  product.amount =
    product.amount != 0
      ? (product.totalSum = product.discountSum = 0)
      : (product.amount++,
        (product.totalSum = product.price * product.amount),
        (product.discountSum =
          (product.discountPercentage / 100) * product.totalSum),
        (productStore.id = product.id));
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function openProduct(id) {
  productStore.id = id;
}
</script>

<style lang="scss" scoped></style>
