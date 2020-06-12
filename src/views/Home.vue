<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <product-list
          :products="products"
          @removeItem="removeProduct"
        ></product-list>
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
          <v-col cols="12" md="6" lg="5" style="position: relative">
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

export default Vue.extend({
  name: 'Home',
  components: {
    ProductList,
    ProductForm,
  },
  data() {
    return {
      dialog: false,
      products: [
        {
          id: '1',
          name: 'Brötchen',
          count: 3,
          done: false,
          dueDate: new Date('2020-06-11T13:29:40Z'),
        },
        {
          id: '2',
          name: 'Joghurt',
          count: 5,
          done: true,
          dueDate: new Date('2020-06-11T13:29:40Z'),
        },
        {
          id: '3',
          name: 'Käse',
          count: 1,
          done: false,
          dueDate: new Date('2020-06-11T13:29:40Z'),
        },
      ] as Product[],
    };
  },
  methods: {
    removeProduct(product: Product) {
      this.products = this.products.filter((p) => p.id !== product.id);
    },
    addProduct(newProduct: Product) {
      this.products.push(newProduct);
      this.dialog = false;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
});
</script>
