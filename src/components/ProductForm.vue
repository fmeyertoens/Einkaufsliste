<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{
        update ? 'Produkt ändern' : 'Neues Produkt'
      }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="onSubmit" ref="form">
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
            min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                :model-value="formattedDate"
                label="Datum"
                clearable
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
                :rules="dateRules"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @update:model-value="dateMenu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="timeMenu"
            :close-on-content-click="false"
            min-width="290px"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="time"
                label="Uhrzeit"
                clearable
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="props"
                :rules="timeRules"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="time"
              format="24hr"
              @update:model-value="timeMenu = false"
            ></v-time-picker>
          </v-menu>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" @click="cancel">Abbrechen</v-btn>
            <v-btn color="primary" variant="flat" type="submit">{{
              update ? 'Speichern' : 'Hinzufügen'
            }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { getEmptyProduct } from '@/services/productFactory';
import { combineDateAndTime, formatTime, isValidTime } from '@/services/dueDate';
import { v4 as uuidv4 } from 'uuid';
import type { Product } from '@/types/product';
import type { VForm } from 'vuetify/components/VForm';

type Props = {
  update?: boolean;
  product?: Product;
};

const props = withDefaults(defineProps<Props>(), {
  update: false,
  product: () => getEmptyProduct(),
});

const emit = defineEmits<{
  newProduct: [product: Product];
  cancel: [];
}>();

const localProduct = ref({ ...props.product });
const productNameRules = [(v: string) => !!v || 'Es wird ein Name benötigt'];
const dateMenu = ref(false);
const timeMenu = ref(false);
const date = ref<Date | null>(
  props.product.dueDate ? new Date(props.product.dueDate) : null
);
const time = ref<string | null>(
  props.product.dueDate ? formatTime(props.product.dueDate) : null
);
const formattedDate = computed(() =>
  date.value
    ? new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date.value)
    : ''
);
const dateRules = [
  () => !time.value || !!date.value || 'Bitte Datum und Uhrzeit angeben',
];
const timeRules = [
  () => !date.value || !!time.value || 'Bitte Datum und Uhrzeit angeben',
  () => !time.value || isValidTime(time.value) || 'Ungültige Uhrzeit',
];

const form = useTemplateRef<InstanceType<typeof VForm>>('form');
const onSubmit = async () => {
  if (!form.value) {
    console.error('Das Produktformular konnte nicht überprüft werden.');
    return;
  }
  const { valid } = await form.value.validate();
  if (!valid) return;

  const newProduct: Product = {
    ...localProduct.value,
    id: localProduct.value.id === '' ? uuidv4() : localProduct.value.id,
    dueDate:
      date.value && time.value
        ? combineDateAndTime(date.value, time.value)
        : undefined,
  };
  emit('newProduct', newProduct);
};

const cancel = () => {
  emit('cancel');
};
</script>
