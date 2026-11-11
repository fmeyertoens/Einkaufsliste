<template>
  <div>
    <v-divider v-if="index !== 0"></v-divider>
    <v-hover #default="{ isHovering, props }">
      <v-list-item :value="product.id" v-bind="props">
        <template #prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              :model-value="product.done"
              @update:model-value="toggleDoneState"
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>
        <template #title>
          <p :class="{ 'text-decoration-line-through': product.done }">
            {{ product.count }} {{ product.name }}
          </p>
        </template>
        <template #subtitle>
          <p v-if="product.dueDate">{{ getDateString(product.dueDate) }}</p>
        </template>
        <template #append>
          <v-dialog
            v-model="dialogOpen"
            persistent
            :fullscreen="$vuetify.display.xs"
            max-width="600px"
          >
            <template #activator="{ props: activatorProps }">
              <v-btn
                v-show="isHovering"
                icon
                color="secondary"
                class="text--lighten-1 mr-2"
                size="small"
                v-bind="activatorProps"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <product-form
              v-if="dialogOpen"
              :update="true"
              :product="product"
              @newProduct="handleUpdateProduct"
              @cancel="closeDialog"
            ></product-form>
          </v-dialog>
          <v-tooltip bottom open-delay="500">
            <template #activator="{ props }">
              <v-btn
                v-show="isHovering"
                icon
                name="btnRemoveProduct"
                color="error"
                size="small"
                class="text--lighten-2"
                @click="handleRemoveItem(product)"
                v-bind="props"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ product.name }} entfernen</span>
          </v-tooltip>
        </template>
      </v-list-item>
    </v-hover>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductForm from '@/components/ProductForm.vue';
import { Product } from '@/types/product';

const props = defineProps({
  index: {
    type: Number,
    required: false,
  },
  product: {
    type: Object as PropType<Product>,
    required: true,
  },
});

const dialogOpen = ref(false);
const productStore = useProductStore();

const getDateString = (date: Date) => {
  return Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).format(date);
};

const handleUpdateProduct = (updatedProduct: Product) => {
  productStore.updateProduct(updatedProduct);
  dialogOpen.value = false;
};

const closeDialog = () => {
  dialogOpen.value = false;
};

const handleRemoveItem = (product: Product) => {
  productStore.removeProduct(product);
};

const toggleDoneState = (done: boolean) => {
  productStore.updateProduct({ ...props.product, done });
};
</script>
