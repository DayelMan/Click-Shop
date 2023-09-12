<template>
  <div class="product__card container">
    <RouterLink to="/" class="path"
      >Home / <span>Product Card</span></RouterLink
    >
    <div class="products">
      <div class="imageses">
        <div class="small__images">
          <div
            class="imagess"
            v-for="image in images"
            @click="changeImg(image)"
          >
            <img
              :src="image"
              alt="small"
              class="images"
              :class="{ activeImg: activeLink === image }"
              @click="setActiveLink(image)"
            />
          </div>
        </div>
        <div class="product">
          <img :src="activeImg" alt="" class="img" />
        </div>
      </div>

      <div class="product__items">
        <h1 class="product__items-title">{{ getProduct().title }}</h1>
        <p class="product__items-price">{{ getProduct().price }}.00$</p>
        <h2 class="product__items-desc-title">Product description</h2>
        <p class="product__items-desc">{{ getProduct().description }}</p>
        <div class="baskets">
          <div class="basket__btns">
            <button
              class="basket__btn"
              @click="decrease(product), productStore.getProducts()"
            >
              -
            </button>
            <div class="basket__count">
              {{ getProduct().amount > 0 ? getProduct().amount : 0 }}
            </div>
            <button
              class="basket__btn plus"
              @click="increase(product), productStore.getProducts()"
            >
              +
            </button>
          </div>
          <div class="bytns">
            <RouterLink to="/trash">
              <button class="btn__log">Buy NOW</button>
            </RouterLink>
          </div>
          <div class="liked">
            <img
              src="../assets/img/like.svg"
              alt=""
              @click="likeedProduct($event, product)"
              :class="{ activees: getProduct().liked == true }"
            />
          </div>
        </div>
      </div>
    </div>
    <Req />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "../stores/products";
import Req from "../components/Req.vue";
import { RouterLink } from "vue-router";

const activeLink = ref("");

const setActiveLink = (link) => {
  activeLink.value = link;
};

function likeedProduct(event, product) {
  event.target.classList.toggle("active");
  getProduct().liked = !getProduct().liked;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

const products = computed(() => productStore.products);
const productStore = useProductStore();
const images = getProduct().images;
const count = ref(1);

// Img
let activeImg = ref("");
activeImg.value = getProduct().thumbnail;

function changeImg(img) {
  activeImg.value = img;
  console.log(activeImg);
}

const yourImage = () => {};

// productStore.getProducts()

function decrease(product) {
  if (getProduct().amount > 0) {
    getProduct().amount--;
  }
  if (!getProduct().hasOwnProperty("totalSum")) {
    Object.defineProperty(getProduct(), "totalSum", {
      get() {
        return this.price * this.amount;
      },
    });
  }
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function increase(product) {
  if (getProduct().amount == undefined) {
    getProduct().amount = 0;
  } else {
    getProduct().amount++;
    if (!getProduct().hasOwnProperty("getTotalSum")) {
      Object.defineProperty(getProduct(), "getTotalSum", {
        get() {
          return this.price * this.amount;
        },
      });
    }
    if (!getProduct().hasOwnProperty("getDiscountSum")) {
      Object.defineProperty(getProduct(), "getDiscountSum", {
        get() {
          return (
            ((100 - this.discountPercentage) / 100) * (this.price * this.amount)
          );
        },
      });
    }
    this.getProduct().totalSum = this.getProduct().getTotalSum;
    this.getProduct().discountSum = this.getProduct().getDiscountSum;
    console.log(getProduct());
    console.log(products);
    localStorage.setItem("productStore", JSON.stringify(productStore));
  }
}

console.log(getProduct());

function openProduct(activeImg) {
  productStore.id = activeImg;
}
function getProduct() {
  return productStore.products.find(
    (product) => product.id === productStore.id
  );
}
</script>
