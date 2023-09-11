<template>
  <div class="categories" id="categories">
    <main class="main" v-if="paginatedProducts.length != 0">
      <h2 class="main__categories-title">Categories</h2>
      <div class="uls">
        <ul class="main__categories-ul" ref="categories container">
          <li
            class="main__categories-li"
            v-for="(item, i) in categories"
            :key="i"
            @click="
              (close = !close), filterGoods(i), setActiveLink(i), (ferd = !ferd)
            "
            :class="{ activeLin: activeLink === i }"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="main__products container">
        <CategoryItem
          v-for="(item, index) in sortedItems"
          :key="index"
          :item="item"
          v-show="ferd"
        />
      </div>

      <div class="main__products container" v-show="close">
        <div class="main__product" v-for="product in paginatedProducts">
          <div class="main__product-popap">
            <RouterLink
              :to="`/productCard/${product.id}`"
              @click="openProduct(product.id)"
              class="kls"
            >
              <img :src="product.thumbnail" alt="" class="main__products-img" />
            </RouterLink>
            <img
              src="../../assets/img/cart.svg"
              alt=""
              class="main__product-popap-img"
              @click="addOrDeleteProduct(product)"
            />
            <img
              src="../../assets/img/like.svg"
              alt=""
              class="main__product-popap-img-two"
              @click="likeedProduct($event, product)"
              :class="{ activees: product.liked == true }"
            />
          </div>

          <p class="main__product-text">{{ product.title }}</p>
          <span>{{ product.price }}.00$</span>
          <div class="main__product-discount">
            {{ Math.floor(product.discountPercentage) }}% OFF
          </div>
        </div>
      </div>

      <div class="v-table__pagination">
        <div
          class="page"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="pageClick(page)"
        >
          {{ page }}
        </div>
      </div>
    </main>
    <h1 class="preloader__api" v-else>Loading...</h1>
  </div>
</template>

<script setup>
import { useProductStore } from "../../stores/products";
import { ref, computed, onMounted } from "vue";
// import Categories from '../Categories.vue'
import { categories } from "../../categories.js";
import CategoryItem from "./CategoryItem.vue";
const productStore = useProductStore();
const likeProduct = computed(() => productStore.getLikedProducts);
const products = computed(() => productStore.products);

console.log(productStore);
const ferd = ref(false);

function addOrDeleteProduct(product) {
  [product.amount, product.totalSum, product.discountSum, productStore.id] =
    product.amount != 0
      ? [0, 0, 0, product.id]
      : [
          1,
          product.price,
          (product.discountPercentage / 100) * product.price,
          product.id,
        ];

  localStorage.setItem("productStore", JSON.stringify(productStore));
}

function likeedProduct(event, product) {
  event.target.classList.toggle("active");
  product.liked = !product.liked;
  localStorage.setItem("productStore", JSON.stringify(productStore));
}

const addProductToFavorites = (product) => {
  productStore.addToFavorites(product);
  localStorage.setItem("productStore", JSON.stringify(productStore));
};

const activeLink = ref("");

function getProduct() {
  return productStore.products.find(
    (product) => product.id === productStore.id
  );
}

console.log(getProduct());

const setActiveLink = (link) => {
  activeLink.value = link;
};

// function likesProduct(event, product) {
//   event.target.classList.add("active");
//   productStore.liked = !productStore.liked;
//   localStorage.setItem("productStore", JSON.stringify(productStore));
// }

// productStore.getProducts();
// new filter

// let getIndexStore = computed(() => productStore.resArray);
let sortedItems = ref(null);
// const allProds = ref();

const filterGoods = (e) => {
  sortedItems.value = productStore.products.filter(
    (item) => item.category == categories[e].toLowerCase()
  );
  // console.log(sortedItems.value);
};

// onMounted(async () => {
//     await productStore.getProducts()
//     allProds.value = getIndexStore.value

// })

// console.log(filterGoods(k));

// Old Filter

const sortType = ref("");
const sortDirection = ref("frg");
const productPerPage = ref(12);
const currentPage = ref(1);
const close = ref(true);
const sortedProducts = computed(() => {
  const products = productStore.products.slice();
  if (sortType.value === "name") {
    return products.sort((a, b) => {
      const nameA = a.brand.toLowerCase();
      const nameB = b.brand.toLowerCase();
      return sortDirection.value === "frg"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (sortType.value === "laptops") {
    return products.sort((a, b) => {
      return sortDirection.value === "frg"
        ? a.category - b.category
        : b.category - a.category;
    });
  } else if (sortType.value === "price") {
    return products.sort((a, b) => {
      return sortDirection.value === "frg"
        ? a.price - b.price
        : b.price - a.price;
    });
  }
  return products;
});

// Pagination

const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / productPerPage.value)
);

const paginatedProducts = computed(() => {
  const from = (currentPage.value - 1) * productPerPage.value;
  const to = from + productPerPage.value;
  return sortedProducts.value.slice(from, to);
});

function openProduct(id) {
  productStore.id = id;
}

function pageClick(page) {
  currentPage.value = page;
}
</script>
