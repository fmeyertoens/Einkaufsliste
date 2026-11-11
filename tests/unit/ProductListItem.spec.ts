import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ProductListItem from '@/components/ProductListItem.vue';
import vuetify from '@/plugins/vuetify';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/product';

const product: Product = {
  id: '1',
  name: 'Äpfel',
  count: 2,
  done: false,
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('products', JSON.stringify([product]));
});

function mountItem() {
  const pinia = createPinia();
  setActivePinia(pinia);
  const store = useProductStore();
  const wrapper = mount(ProductListItem, {
    props: { product: store.products[0], index: 0 },
    global: { plugins: [pinia, vuetify] },
  });
  return { wrapper, store };
}

describe('ProductListItem', () => {
  it('renders the product name and count', () => {
    const { wrapper } = mountItem();

    expect(wrapper.text()).toContain('2 Äpfel');
  });

  it('updates and persists the done state', async () => {
    const { wrapper, store } = mountItem();

    await wrapper.get('input[type="checkbox"]').setValue(true);

    expect(store.products[0].done).toBe(true);
    expect(JSON.parse(localStorage.getItem('products') || '[]')[0].done).toBe(
      true
    );
  });

  it('removes the product from the store', async () => {
    const { wrapper, store } = mountItem();

    await wrapper.get('button[name="btnRemoveProduct"]').trigger('click');

    expect(store.products).toEqual([]);
    expect(JSON.parse(localStorage.getItem('products') || '[]')).toEqual([]);
  });
});
