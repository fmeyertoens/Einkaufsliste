import { describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { VDatePicker } from 'vuetify/components/VDatePicker';
import { VMenu } from 'vuetify/components/VMenu';
import { VTimePicker } from 'vuetify/components/VTimePicker';
import ProductForm from '@/components/ProductForm.vue';
import vuetify from '@/plugins/vuetify';
import type { Product } from '@/types/product';

function mountForm(product?: Product) {
  return mount(ProductForm, {
    props: product ? { product, update: true } : {},
    global: { plugins: [vuetify] },
    attachTo: document.body,
  });
}

describe('ProductForm', () => {
  it('validates a missing product name', async () => {
    const wrapper = mountForm();

    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.text()).toContain('Es wird ein Name benötigt');
    expect(wrapper.emitted('newProduct')).toBeUndefined();
    wrapper.unmount();
  });

  it('saves a date and time selected through the Vuetify pickers', async () => {
    const wrapper = mountForm();
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Äpfel');
    await inputs[1].setValue('2');
    await inputs[2].trigger('click');
    await flushPromises();

    wrapper
      .getComponent(VDatePicker)
      .vm.$emit('update:modelValue', new Date(2026, 9, 9));
    await flushPromises();
    expect(wrapper.findAllComponents(VMenu)[0].props('modelValue')).toBe(false);
    await inputs[3].trigger('click');
    await flushPromises();

    wrapper.getComponent(VTimePicker).vm.$emit('update:modelValue', '04:30');
    await flushPromises();
    expect(wrapper.findAllComponents(VMenu)[1].props('modelValue')).toBe(false);
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.emitted('newProduct')?.[0][0]).toMatchObject({
      name: 'Äpfel',
      count: 2,
      dueDate: new Date(2026, 9, 9, 4, 30),
    });
    wrapper.unmount();
  });

  it('requires both a date and a time instead of discarding either', async () => {
    const wrapper = mountForm();
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Milch');
    await inputs[2].trigger('click');
    await flushPromises();

    wrapper
      .getComponent(VDatePicker)
      .vm.$emit('update:modelValue', new Date(2026, 9, 9));
    await flushPromises();
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.text()).toContain('Bitte Datum und Uhrzeit angeben');
    expect(wrapper.emitted('newProduct')).toBeUndefined();
    wrapper.unmount();
  });

  it('requires a date when only a time is selected', async () => {
    const wrapper = mountForm();
    const inputs = wrapper.findAll('input');
    await inputs[0].setValue('Milch');
    await inputs[3].trigger('click');
    await flushPromises();

    wrapper.getComponent(VTimePicker).vm.$emit('update:modelValue', '04:30');
    await flushPromises();
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.text()).toContain('Bitte Datum und Uhrzeit angeben');
    expect(wrapper.emitted('newProduct')).toBeUndefined();
    wrapper.unmount();
  });

  it('allows a product without a due date', async () => {
    const wrapper = mountForm();
    await wrapper.findAll('input')[0].setValue('Milch');
    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.emitted('newProduct')?.[0][0]).toMatchObject({
      name: 'Milch',
      dueDate: undefined,
    });
    wrapper.unmount();
  });

  it('retains the due date when editing a product', async () => {
    const product: Product = {
      id: '1',
      name: 'Brot',
      count: 1,
      done: false,
      dueDate: new Date(2026, 9, 9, 14, 30),
    };
    const wrapper = mountForm(product);

    await wrapper.get('form').trigger('submit');
    await flushPromises();

    expect(wrapper.emitted('newProduct')?.[0][0]).toEqual(product);
    wrapper.unmount();
  });
});
