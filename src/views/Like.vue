<template>
  <div class="like container" v-if="likedProducts.length != 0">
    <RouterLink to="/" class="path">Home / <span>Like</span></RouterLink>
    <div class="main__products container alls__extra">
      <div class="main__product" v-for="extraProduct in likedProducts">
        <div class="main__product-popap extra__productses">
          <RouterLink
            :to="`/productCard/${extraProduct.id}`"
            @click="openProduct(extraProduct.id)"
            class="kls"
          >
            <img
              :src="extraProduct.thumbnail"
              alt=""
              class="main__products-img"
            />
          </RouterLink>
          <img
            src="../assets/img/cart.svg"
            alt=""
            class="main__product-popap-img"
            @click="addOrDeleteProduct(product)"
          />
          <img
            src="../assets/img/like.svg"
            alt=""
            class="main__product-popap-img-two"
            @click="likeProduct($event, product)"
            :class="{ activees: getProduct().liked == true }"
          />
        </div>

        <p class="main__product-text">{{ extraProduct.title }}</p>
        <span>{{ extraProduct.price }}.00$</span>
        <!-- <div class="main__product-discount">
            {{ Math.floor(extraProduct.discountPercentage) }}% OFF
          </div> -->
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
  getProduct().liked = !getProduct().liked;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}


// add or delete product

function addOrDeleteProduct(product) {
  getProduct().amount =
    getProduct().amount != 0
      ? (getProduct().totalSum = getProduct().discountSum = 0)
      : (getProduct().amount++,
        (getProduct().totalSum = getProduct().price * getProduct().amount),
        (getProduct().discountSum =
          (getProduct().discountPercentage / 100) * getProduct().totalSum),
        (productStore.id = getProduct().id));
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function getProduct() {
  return productStore.products.find(
    (product) => product.id === productStore.id
  );
}

function openProduct(id) {
  productStore.id = id;
}
</script>

<style lang="scss" scoped></style>
