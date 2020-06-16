<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <product-list :products="storeState.products"></product-list>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6" lg="5" style="position: relative">
            <v-btn
              class="mx-2"
              fab
              dark
              absolute
              bottom
              right
              color="secondary"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark>mdi-plus</v-icon>
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

<script lang="ts">
import Vue from 'vue';
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue';
import ProductForm from '@/components/ProductForm.vue';
import { EventBus } from '@/services/EventBus';
import { store } from '@/services/ProductStore';

export default Vue.extend({
  name: 'Home',
  components: {
    ProductList,
    ProductForm,
  },
  data() {
    return {
      dialog: false,
      storeState: store.state,
    };
  },
  mounted() {
    EventBus.$on('removeProduct', this.removeProduct);
    EventBus.$on('updateProduct', this.changeProduct);
  },
  methods: {
    removeProduct(product: Product) {
      store.removeProduct(product);
    },
    changeProduct(changedProduct: Product) {
      store.changeProduct(changedProduct);
    },
    addProduct(newProduct: Product) {
      store.addProduct(newProduct);
      this.dialog = false;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
});
</script>
