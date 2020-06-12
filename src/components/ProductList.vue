<template>
  <v-card v-if="products.length > 0">
    <product-list-item
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></product-list-item>
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
