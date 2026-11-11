<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <product-list :products="productStore.products" />
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      :fullscreen="$vuetify.display.xs"
      max-width="600px"
    >
      <template #activator="{ props }">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="5" style="position: relative">
            <v-btn
              class="mx-2"
              icon
              color="secondary"
              aria-label="Produkt hinzufügen"
              style="position: absolute; bottom: 0; right: 0"
              v-bind="props"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <product-form
        v-if="dialog"
        @newProduct="addProduct"
        @cancel="closeDialog"
      ></product-form>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductList from '@/components/ProductList.vue';
import ProductForm from '@/components/ProductForm.vue';
import type { Product } from '@/types/product';

const productStore = useProductStore();

const dialog = ref(false);

const addProduct = (newProduct: Product) => {
  productStore.addProduct(newProduct);
  dialog.value = false;
};

const closeDialog = () => {
  dialog.value = false;
};
</script>
