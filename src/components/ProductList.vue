<template>
  <div class="d-flex justify-center">
    <v-list>
      <v-list-item
        v-for="product in products"
        :key="product.id"
        :value="product.id"
      >
        <v-list-item-content>
          <v-list-item-title
            >{{ product.count }} {{ product.name }}</v-list-item-title
          >
          <v-list-item-subtitle>{{
            `${getDateString(product.dueDate)}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox v-model="product.done"></v-checkbox>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
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
  },
});
</script>
