<template>
  <div>
    <v-divider v-if="index !== 0"></v-divider>
    <v-hover v-slot:default="{ hover }">
      <v-list-item :value="product.id">
        <v-list-item-action>
          <v-checkbox v-model="product.done"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': product.done }"
            >{{ product.count }} {{ product.name }}</v-list-item-title
          >
          <v-list-item-subtitle v-if="product.dueDate">{{
            `${getDateString(product.dueDate)}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-dialog
          v-model="dialogOpen"
          persistent
          :fullscreen="$vuetify.breakpoint.xsOnly"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="hover"
              icon
              color="secondary"
              class="text--lighten-1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <product-form
            v-if="dialogOpen"
            :update="true"
            :product="product"
            @newProduct="updateProduct"
            @cancel="closeDialog"
          ></product-form>
        </v-dialog>
        <v-tooltip bottom open-delay="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-show="hover"
              icon
              name="btnRemoveProduct"
              color="error"
              class="text--lighten-2"
              @click="removeItem(product)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>{{ product.name }} entfernen</span>
        </v-tooltip>
      </v-list-item>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { EventBus } from '@/services/EventBus';
import ProductForm from '@/components/ProductForm.vue';

export default Vue.extend({
  components: {
    ProductForm,
  },
  props: {
    index: {
      type: Number,
      required: false,
    },
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  data() {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    getDateString(date: Date) {
      return Intl.DateTimeFormat('de-DE', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(date);
    },
    updateProduct(updatedProduct: Product) {
      EventBus.$emit('updateProduct', updatedProduct);
      this.dialogOpen = false;
    },
    closeDialog() {
      this.dialogOpen = false;
    },
    removeItem(product: Product) {
      EventBus.$emit('removeProduct', product);
    },
  },
});
</script>
