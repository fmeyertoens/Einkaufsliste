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

<script setup lang="ts">
import { PropType } from 'vue';
import ProductListItem from '@/components/ProductListItem.vue';
import { Product } from '@/types/product';

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});
</script>
