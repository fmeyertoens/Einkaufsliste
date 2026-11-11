<template>
  <v-card v-if="products.length > 0">
    <v-list>
      <v-slide-y-transition group>
        <product-list-item
          v-for="(product, i) in products"
          :key="product.id"
          :product="product"
          :index="i"
        ></product-list-item>
      </v-slide-y-transition>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import ProductListItem from '@/components/ProductListItem.vue';
import type { Product } from '@/types/product';

defineProps({
  products: {
    type: Array as PropType<Product[]>,
    required: true,
  },
});
</script>
