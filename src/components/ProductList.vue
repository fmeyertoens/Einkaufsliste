<template>
  <v-card v-if="products.length > 0">
    <v-slide-y-transition group tag="v-list">
      <product-list-item
        v-for="(product, i) in products"
        :key="product.id"
        :product="product"
        :index="i"
      ></product-list-item>
    </v-slide-y-transition>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ProductListItem from '@/components/ProductListItem.vue';

export default Vue.extend({
  components: {
    ProductListItem,
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true,
    },
  },
});
</script>
