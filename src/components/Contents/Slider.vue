<template>
  <div class="header sliders container">
    <div class="slider container">
        <div class="slider__slide">
          <h1 class="slider__title">iPhone 14 Pro Max</h1>
          <button class="btn__log">SHOP NOW</button>
        </div>
        </div>
   <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    
    <swiper-slide>
        <div class="slider__image">
          <img src="../../assets/img/iphone14.png" alt="iphone14"  />
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slider__image">
          <img src="../../assets/img/a74.jpg" alt="galaxy"  />
        </div>
    </swiper-slide>
    <swiper-slide>
        <div class="slider__image">
          <img src="../../assets/img/a74.jpg" alt="iphone14"  />
        </div>
    </swiper-slide>
    

  </swiper>
  </div>
  

</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Autoplay, Pagination, Navigation],
    };
  },
};
</script>
