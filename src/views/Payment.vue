<template>
  <div
    class="payment__content container"
    id="payment"
    :class="isActive ? 'activeHide' : ''"
  >
    <RouterLink to="/trash" class="path"
      >Home / <span>Payment and delivery</span></RouterLink
    >
    <div class="paument__items" v-if="orderedProducts.length != 0">
      <div class="payment__in">
        <h2 class="payment__content-title">Billing Address</h2>

        <div class="payment__inputs">
          <form action="../telegram.php" class="form" method="post" id="myForm">
            <div class="payment__inputs-items">
              <div class="payment__inputs-items-item">
                <h3 class="input__title">First Name <span>*</span></h3>
                <input
                  type="text"
                  class="input__payment"
                  name="user_name"
                  v-bind="name"
                />
                <pre class="pre">{{ errors.name }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Last Name <span>*</span></h3>
                <input type="text" class="input__payment" v-bind="lastname" />
                <pre class="pre">{{ errors.lastname }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Country / Region <span>*</span></h3>
                <input
                  type="text"
                  class="input__payment"
                  placeholder="Select a country / region"
                  v-bind="country"
                />
                <pre class="pre">{{ errors.country }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Town / City <span>*</span></h3>
                <input type="text" class="input__payment" v-bind="town" />
                <pre class="pre">{{ errors.town }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Street Address <span>*</span></h3>
                <input
                  type="text"
                  class="input__payment"
                  placeholder="House number and street name"
                  v-bind="adress"
                />
                <pre class="pre">{{ errors.adress }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title"><span>ㅤ</span></h3>
                <input
                  type="text"
                  class="input__payment"
                  placeholder="Appartment, suite, unit, etc. (optional)"
                  v-bind="country"
                />
                <pre class="pre">{{
                  errors.country ? "Нельзя пустым оставлять!" : ""
                }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Email address <span>*</span></h3>
                <input
                  type="text"
                  class="input__payment"
                  placeholder="Email"
                  v-bind="email"
                />
                <pre class="pre">{{
                  errors.email ? "Email должен содержать @gmail.com" : ""
                }}</pre>
              </div>
              <div class="payment__inputs-items-item">
                <h3 class="input__title">Phone Number <span>*</span></h3>
                <select name="phone" class="phone">
                  <option value="value1">+966</option>
                  <option value="value2">+998</option>
                  <option value="value3">+7</option>
                </select>
                <input
                  type="text"
                  class="input__payment"
                  placeholder="Phone"
                  style="width: 260px"
                  v-bind="phone"
                />
                <pre class="pre">{{
                  errors.phone ? "Телефон должен содержать только цифры !" : ""
                }}</pre>
              </div>
              <div class="check">
                <div class="checkbox">
                  <input type="checkbox" class="check__input" />
                  <label class="chekbox__text"
                    >Ship to a different address?</label
                  >
                </div>
                <div class="check_notes">
                  <h2>Order notes (optional) <span>*</span></h2>
                  <textarea cols="30" rows="10" class="ser"></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="payment__order">
        <h3 class="payment__order-title">Your Order</h3>
        <div class="payment__orders">
          <h3 class="payment__orders-title">Products</h3>
          <h4 class="payment__orders-title">Subtotal</h4>
        </div>
        <div class="scroll">
          <div
            class="payment__products"
            v-for="product in orderedProducts"
            :key="product.id"
          >
            <div class="payment__products-content">
              <img :src="product.thumbnail" alt="" />
              <div class="payment__products-content-sku">
                <h2 class="payment__products-content-sku-title">
                  {{ product.title }}
                </h2>
                <p class="payment__products-content-sku-skus">
                  SKU.{{ product.id }}
                </p>
              </div>
              <p class="payment__products-content-total-products">
                (x{{ product.amount }})
              </p>
              <h4 class="payment__products-content-total-price">
                ${{ product.totalSum }}.00
              </h4>
            </div>
          </div>
        </div>

        <div class="payment__info">
          <div class="infos">
            <div class="payment__info-content">
              <p class="payment__info-text">Subtotal</p>
              <p class="payment__info-text">
                ${{ !subTotalSum ? 0 : subTotalSum }}.00
              </p>
            </div>
            <div class="payment__info-content">
              <p class="payment__info-text">Coupon Discount</p>
              <p class="payment__info-text">(-) 00.00</p>
            </div>
            <div class="payment__info-content">
              <p class="payment__info-text">Shiping</p>
              <p class="payment__info-text">$0.00</p>
            </div>
          </div>

          <p class="payment__info-view">View shipping charge</p>
          <div class="payment__info-content">
            <p class="payment__info-text">Total</p>
            <p class="payment__info-text">
              <span>${{ !subTotalSum ? 0 : subTotalSum }}.00</span>
            </p>
          </div>
          <div class="place__button">
            <button
              class="btns"
              @click="(closeModal = !closeModal), toggleClass"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
    <LikeElse v-else />
  </div>

  <transition name="modal" v-show="!closeModal">
    <div class="popap">
      <div class="popap__thank">
        <div class="popap__img">
          <img src="../assets/img/thank-you.svg" alt="thank" />
          <img
            src="../assets/img/x.svg"
            alt=""
            @click="closeModal = !closeModal"
            class="x"
          />
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
            <div class="scroll">
              <div
                class="payment__products-content popap__products"
                v-for="product in orderedProducts"
                :key="product.id"
              >
                <img :src="product.thumbnail" alt="" />
                <div class="payment__products-content-sku popap__sku">
                  <h2 class="payment__products-content-sku-title popap__title">
                    {{ product.title }}
                  </h2>
                  <p class="payment__products-content-sku-skus popap__skus">
                    SKU.{{ product.id }}
                  </p>
                </div>
                <p class="payment__products-content-total-products">
                  (x{{ product.amount }})
                </p>
                <h4 class="payment__products-content-total-price">
                  ${{ product.totalSum }}.00
                </h4>
              </div>
            </div>
          </div>
          <div
            class="payment__info-content"
            style="margin-bottom: 15px; margin-top: 15px"
          >
            <p class="payment__info-text">Shiping</p>
            <p class="payment__info-text">$0.00</p>
          </div>
          <div class="payment__info-content" style="margin-top: 15px">
            <p class="payment__info-text">Total</p>
            <p class="payment__info-text">
              <span>${{ !subTotalSum ? 0 : subTotalSum }}.00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useProductStore } from "../stores/products.js";
import { ref, computed } from "vue";
import LikeElse from "../components/LikeElse.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { values, errors, defineInputBinds } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    lastname: yup.string().required(),
    country: yup.string().required(),
    town: yup.string().required(),
    adress: yup.string().required(),
    phone: yup.number().required(),
  }),
});

const isActive = ref(false);

function toggleClass() {
  isActive.value = !isActive.value;
  console.log(document.body);
}


const email = defineInputBinds("email", {
  validateOnInput: true,
});
const name = defineInputBinds("name", {
  validateOnInput: true,
});
const lastname = defineInputBinds("lastname", {
  validateOnInput: true,
});
const country = defineInputBinds("country", {
  validateOnInput: true,
});
const town = defineInputBinds("town", {
  validateOnInput: true,
});
const adress = defineInputBinds("adress", {
  validateOnInput: true,
});
const phone = defineInputBinds("phone", {
  validateOnInput: true,
});

const orderedProducts = computed(() => productStore.getOrderedProducts);
const subTotalSum = computed(() => productStore.getTotalSum);

// localStorage.setItem("productStore", JSON.stringify(productStore));

function increase(product) {
  product.amount++;
  product.totalSum = product.price * product.amount;
  product.discountSum =
    ((100 - product.discountPercentage) / 100) *
    (product.price * product.amount);
}

function decrease(product) {
  if (product.amount > 0) {
    product.amount--;
    product.totalSum = product.price * product.amount;
    product.discountSum =
      ((100 - product.discountPercentage) / 100) *
      (product.price * product.amount);
  }
}

function deleteProduct(product) {
  product.amount = 0;
  product.totalSum = 0;
}

const ModalShow = ref(false);

const closeModal = ref(true);

const productStore = useProductStore();

// productStore.getProducts();
</script>
