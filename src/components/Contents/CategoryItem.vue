<template>
  <div class="main__products container">
        <div class="main__product">
          <div class="main__product-popap">
            <RouterLink
            :to="`/productCard/${props.item.id}`"
            @click="openProduct(props.item.id)"
            class="kls"
          >
            <img :src="props.item.images[0]" alt="" class="main__products-img" />
          </RouterLink>
          <img src="../../assets/img/cart.svg" alt="" class="main__product-popap-img">
          <img src="../../assets/img/like.svg" alt="" class="main__product-popap-img-two">
          </div>
          
          <p class="main__product-text">{{ props.item.title }}</p>
          <span>{{ props.item.price }}.00$</span>
          <div class="main__product-discount">
          {{ Math.floor(props.item.discountPercentage) }}% OFF
        </div>
        </div>
      </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../../stores/products";

const productStore = useProductStore();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});



function openProduct(id) {
  productStore.id = id;
}
onMounted(() => {});
</script>
