<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{
        update ? 'Produkt ändern' : 'Neues Produkt'
      }}</span></v-card-title
    >
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="onSubmit">
          <v-text-field v-model="localProduct.name" label="Name"></v-text-field>
          <v-text-field
            v-model.number="localProduct.count"
            label="Anzahl"
            type="number"
          ></v-text-field>
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                clearable
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="timeMenu"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                clearable
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="time"
              @input="timeMenu = false"
            ></v-time-picker>
          </v-menu>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="cancel">Abbrechen</v-btn>
            <v-btn color="primary" depressed type="submit">{{
              update ? 'Speichern' : 'Hinzufügen'
            }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { getEmptyProduct } from '@/services/productFactory';
import { v4 as uuidv4 } from 'uuid';

export default Vue.extend({
  props: {
    update: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object as PropType<Product>,
      default: () => {
        return getEmptyProduct();
      },
    },
  },
  data() {
    return {
      localProduct: { ...this.product },
      dateMenu: false,
      timeMenu: false,
      date: this.product.dueDate
        ? this.getDateInISOFormat(this.product.dueDate)
        : undefined,
      time: this.product.dueDate
        ? Intl.DateTimeFormat('de-DE', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          }).format(this.product.dueDate)
        : undefined,
    };
  },
  methods: {
    onSubmit(): void {
      const dueDate = new Date(`${this.date}T${this.time}`);
      const newProduct: Product = {
        ...this.localProduct,
        id: this.localProduct.id === '' ? uuidv4() : this.localProduct.id,
        dueDate: this.isValidDate(dueDate) ? dueDate : undefined,
      };
      this.$emit('newProduct', newProduct);
    },
    cancel(): void {
      this.$emit('cancel');
    },
    isValidDate(d: Date): boolean {
      // https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
      return d instanceof Date && !isNaN(d.getTime());
    },
    getDateInISOFormat(date: Date): string {
      return `${date.getFullYear()}-${
        date.getMonth() < 10 ? '0' : ''
      }${date.getMonth() + 1}-${
        date.getDate() < 10 ? '0' : ''
      }${date.getDate()}`;
    },
  },
});
</script>
