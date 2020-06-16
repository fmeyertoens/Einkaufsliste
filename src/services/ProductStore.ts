import { getProducts, saveProducts } from './ProductService';

export const store = {
  state: {
    products: getProducts(),
  },
  addProduct(newProduct: Product) {
    this.state.products.push(newProduct);
    console.log('Product added');
    saveProducts(this.state.products);
  },
  removeProduct(product: Product) {
    this.state.products = this.state.products.filter(
      (p) => p.id !== product.id
    );
    console.log('Product removed');
    saveProducts(this.state.products);
  },
  changeProduct(changedProduct: Product) {
    const index = this.state.products.findIndex(
      (product) => product.id === changedProduct.id
    );
    if (index !== -1) this.state.products.splice(index, 1, changedProduct);
    console.log('Product changed');
    saveProducts(this.state.products);
  },
};
