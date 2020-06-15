function getEmptyProduct(): Product {
  return {
    id: '',
    name: '',
    count: 0,
    dueDate: undefined,
    done: false,
  };
}

export { getEmptyProduct };
