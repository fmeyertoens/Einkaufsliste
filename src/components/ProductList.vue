<template>
  <div class="d-flex justify-center">
    <v-list>
      <v-list-item
        v-for="product in products"
        :key="product.id"
        :value="product.id"
      >
        <v-list-item-action>
          <v-checkbox v-model="product.done"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            >{{ product.count }} {{ product.name }}</v-list-item-title
          >
          <v-list-item-subtitle>{{
            `${getDateString(product.dueDate)}`
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon color="secondary" class="text--lighten-1">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" class="text--lighten-2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
export default Vue.extend({
  props: {
    products: {
      type: Object as PropType<Product[]>,
      required: true,
    },
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
