import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductStore } from '@/stores/productStore';
import type { Product } from '@/types/product';

const existingProduct: Product = {
  id: 'existing',
  name: 'Äpfel',
  count: 2,
  done: false,
  dueDate: new Date('2026-10-09T12:30:00.000Z'),
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('products', JSON.stringify([existingProduct]));
  setActivePinia(createPinia());
});

describe('product store', () => {
  it('rehydrates dates saved by the previous store', () => {
    const store = useProductStore();

    expect(store.products[0].dueDate).toBeInstanceOf(Date);
    expect(store.products[0].dueDate?.toISOString()).toBe(
      '2026-10-09T12:30:00.000Z'
    );
  });

  it('persists adding, updating, and removing products', () => {
    const store = useProductStore();
    const newProduct: Product = {
      id: 'new',
      name: 'Milch',
      count: 1,
      done: false,
    };

    store.addProduct(newProduct);
    store.updateProduct({ ...newProduct, done: true });

    setActivePinia(createPinia());
    const reloadedStore = useProductStore();
    expect(reloadedStore.products.find((product) => product.id === 'new')).toEqual(
      { ...newProduct, done: true }
    );

    reloadedStore.removeProduct(existingProduct);
    setActivePinia(createPinia());
    expect(useProductStore().products).toEqual([{ ...newProduct, done: true }]);
  });
});
