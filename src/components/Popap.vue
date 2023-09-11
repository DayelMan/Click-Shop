<template> 
  <transition name="modal" v-show="close"> 
    <div class="popap" v-show="closeModal">
      <div class="popap__thank"> 
        <div class="popap__img">
          <img src="../assets/img/thank-you.svg" alt="thank" />
          <img src="../assets/img/x.svg" alt="" @click="close = false" class="x"/>
          <button @click="close = false"> asd</button>
        </div>
      </div>
      <div class="popap__info container">
        <div class="popap__infos">
          <h3 class="popap__info-order">Order</h3>
          <div class="popap__products-info">
            <div class="popap__products-info-infos">
              <p class="popap__products-info-infos-title">Products</p>
              <p class="popap__products-info-infos-title">Qty</p>
              <p class="popap__products-info-infos-title">Subtotal</p>
            </div>
            <div class="line"></div>
            <div class="payment__products-content popap__products">
              <img src="../assets/img/galaxy.png" alt="" />
              <div class="payment__products-content-sku popap__sku">
                <h2 class="payment__products-content-sku-title popap__title">
                  Samsung GalaxyA52 White 128Gb
                </h2>
                <p class="payment__products-content-sku-skus popap__skus">
                  SKU.{{ products }}
                </p>
              </div>
              <p class="payment__products-content-total-products">(x1)</p>
              <h4 class="payment__products-content-total-price">$119.00</h4>
            </div>
            <div class="payment__products-content popap__products">
              <img src="../assets/img/rioba.jpg" alt="" />
              <div class="payment__products-content-sku popap__sku">
                <h2 class="payment__products-content-sku-title popap__title">
                  RIOBA Apple Juice
                </h2>
                <p class="payment__products-content-sku-skus popap__skus">
                  SBM-HD0002-259
                </p>
              </div>
              <p class="payment__products-content-total-products">(x1)</p>
              <h4 class="payment__products-content-total-price">$19.00</h4>
            </div>
          </div>
          <div
            class="payment__info-content"
            style="margin-bottom: 15px; margin-top: 15px"
          >
            <p class="payment__info-text">Shiping</p>
            <p class="payment__info-text">$16.00</p>
          </div>
          <div class="line"></div>
          <div class="payment__info-content" style="margin-top: 15px">
            <p class="payment__info-text">Total</p>
            <p class="payment__info-text"><span>$154.00</span></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    close: Boolean,
  },
  setup(props) {
    console.log(props.close);
  },
};
// function closeModal() {
// /*   this.$emit("close"); */
//   console.log(closeModal());  
// }


const closeModal = ref(false)
console.log(closeModal);
// closeModal()
// props: {
//       close: {
//         typeof: Boolean
//       }
// }
</script>
