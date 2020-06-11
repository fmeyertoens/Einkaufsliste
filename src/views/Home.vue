<template>
  <product-list :products="products"></product-list>
</template>

<script lang="ts">
import Vue from 'vue';
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    ProductList,
  },
  data() {
    return {
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
});
</script>
