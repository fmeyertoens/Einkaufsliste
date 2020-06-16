function getEmptyProduct(): Product {
  return {
    id: '',
    name: '',
    count: 0,
    dueDate: undefined,
    done: false,
  };
}

function createProduct(product: {
  id: string;
  name: string;
  count: number;
  done: boolean;
  dueDate?: Date;
}): Product {
  return {
    ...product,
    dueDate: product.dueDate ? new Date(product.dueDate) : undefined,
  };
}

export { getEmptyProduct, createProduct };
