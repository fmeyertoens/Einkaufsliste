<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{
        update ? 'Produkt ändern' : 'Neues Produkt'
      }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="onSubmit" v-model="valid" ref="form">
          <v-text-field
            v-model="localProduct.name"
            label="Name"
            required
            :rules="productNameRules"
          ></v-text-field>
          <v-text-field
            v-model.number="localProduct.count"
            label="Anzahl"
            type="number"
            required
          ></v-text-field>
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
          >
            <!-- TODO: replace with v-date-input, validate before submit -->
            <template #activator="{ props }">
              <v-text-field
                v-model="date"
                clearable
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
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
            <template #activator="{ props }">
              <v-text-field
                v-model="time"
                clearable
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="props"
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

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { getEmptyProduct } from '@/services/productFactory';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/types/product';
import { VForm } from 'vuetify/components';

type Props = {
  update?: boolean;
  product?: Product;
};

const props = withDefaults(defineProps<Props>(), {
  update: false,
  product: () => getEmptyProduct(),
});

const emit = defineEmits(['newProduct', 'cancel']);

const localProduct = ref({ ...props.product });
const valid = ref(true);
const productNameRules = [(v: string) => !!v || 'Es wird ein Name benötigt'];
const dateMenu = ref(false);
const timeMenu = ref(false);
const date = ref(
  props.product.dueDate ? getDateInISOFormat(props.product.dueDate) : undefined
);
const time = ref(
  props.product.dueDate
    ? Intl.DateTimeFormat('de-DE', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).format(props.product.dueDate)
    : undefined
);

const form = useTemplateRef<VForm>('form');
const onSubmit = async () => {
  if (!form.value) return;
  await form.value.validate();
  if (!valid.value) return;

  const dueDate = new Date(`${date.value}T${time.value}`);
  const newProduct: Product = {
    ...localProduct.value,
    id: localProduct.value.id === '' ? uuidv4() : localProduct.value.id,
    dueDate: isValidDate(dueDate) ? dueDate : undefined,
  };
  emit('newProduct', newProduct);
};

const cancel = () => {
  emit('cancel');
};

const isValidDate = (d: Date): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
};

function getDateInISOFormat(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${
    date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
}
</script>
