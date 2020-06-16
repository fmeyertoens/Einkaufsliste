import { createProduct } from './productFactory';

const mockData: Product[] = [
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
  },
];
const LSKey = 'products';

function getProducts(): Product[] {
  const savedProductsString = localStorage.getItem(LSKey);
  if (savedProductsString) {
    let savedProducts: Product[] = JSON.parse(savedProductsString);
    savedProducts = savedProducts.map((product) => {
      return createProduct(product);
    });
    return savedProducts;
  }
  return mockData;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(LSKey, JSON.stringify(products));
}

export { getProducts, saveProducts };
