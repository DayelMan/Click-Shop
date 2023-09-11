import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => {
    if (localStorage.getItem("productStore")) {
      return JSON.parse(localStorage.getItem("productStore"));
    }

    return {
      products: [],
      id: null,
      totalPrice: null,
      cart: [],
      search: "",
      categories: [],
      orderedProducts: [],
      favorites: [],
    };
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
    // Extra Products
    getRecomedationProduct() {
      const currentProduct = this.products.find(
        (product) => product.id === this.id
      );
      const extraProducts = this.products.filter(
        (product) =>
          product.category === currentProduct?.category &&
          product.id !== this.id
      );

      return extraProducts;
    },
    // Liked Products
    getLikedProducts() {
      let likedProducts = this.products.filter(
        (product) => product.liked == true
      );
      return likedProducts;
    },

    getOrderedProducts() {
      let orderedProducts = this.products.filter(
        (product) => product.amount && product.amount != 0
      );
      return orderedProducts;
    },

    getTotalSum() {
      const subTotalSum = this.products.reduce(
        (sum, product) => sum + product.totalSum,
        0
      );
      return subTotalSum; 
    },

    getTotalProducts() {
      let totalQuantity = 0;
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j].amount != undefined) {
          totalQuantity += this.products[j].amount;
        } else {
          totalQuantity = 0;
        }
      }
      console.log(totalQuantity);
      return totalQuantity;
    },

    getFavorites: (state) => {
      return state.favorites;
    },
  },
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/?&limit=48`
        );
        this.products = response.data.products;
        const productStore =
          JSON.parse(localStorage.getItem("productStore"))?.products || [];

        for (let i = 0; i < this.products.length; i++) {
          const {
            amount = 0,
            totalSum = 0,
            discountSum = 0,
            liked,
          } = productStore[i] || {};

          this.products[i].amount = amount;
          this.products[i].totalSum = totalSum;
          this.products[i].discountSum = discountSum;
          this.products[i].liked = liked;
        }
      } catch (error) {
        console.error(error);
      }
    },
    addToFavorites(products) {
      this.favorites.push(products);
    },
  },
});
