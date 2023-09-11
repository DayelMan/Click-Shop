<template>
  <Slider />
  <Category />
  <More />
</template>

<script setup>
import Slider from '../components/Contents/Slider.vue';
import Category from '../components/Contents/Category.vue';
import { useProductStore } from "../stores/products";
import { ref, computed, onMounted } from 'vue';    
import More from '../components/Contents/More.vue';
const productStore = useProductStore();

productStore.getProducts()
</script>

