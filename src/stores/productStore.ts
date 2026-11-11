import { defineStore } from 'pinia';
import type { Product } from '@/types/product';
import { getProducts, saveProducts } from '@/services/ProductService';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: getProducts(),
  }),
  actions: {
    updateProduct(updatedProduct: Product) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) this.products[index] = updatedProduct;
      saveProducts(this.products);
    },
    removeProduct(product: Product) {
      this.products = this.products.filter((p) => p.id !== product.id);
      saveProducts(this.products);
    },
    addProduct(newProduct: Product) {
      this.products.push(newProduct);
      saveProducts(this.products);
    },
  },
});
