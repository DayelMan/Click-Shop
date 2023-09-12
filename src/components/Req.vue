<template>
  <h3 class="extra__products-title">You may be interested in</h3>
  <div class="main__products container alls__extra">
    <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
      <swiper-slide>
        <div class="main__product" v-for="extraProduct in extraProducts">
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
            />
            <img
              src="../assets/img/like.svg"
              alt=""
              class="main__product-popap-img-two"
              @click="likeedProduct($event, product)"
              :class="{ activees: getProduct().liked == true }"
            />
          </div>
          <p class="main__product-text">{{ extraProduct.title }}</p>
          <span>{{ extraProduct.price }}.00$</span>
          <!-- <div class="main__product-discount">
            {{ Math.floor(extraProduct.discountPercentage) }}% OFF
          </div> -->
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { useProductStore } from "../stores/products";
import { computed } from "vue";

const productStore = useProductStore();
const extraProducts = computed(() => productStore.getRecomedationProduct);
const likeedProducts = computed(() => productStore.getLikedProducts);

function getProduct() {
  return productStore.products.find(
    (product) => product.id === productStore.id
  );
}
function openProduct(id) {
  productStore.id = id;
}
function likeedProduct(event, product) {
  event.target.classList.toggle("active");
  getProduct().liked = !getProduct().liked;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}
</script>
