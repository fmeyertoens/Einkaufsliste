function getEmptyProduct(): Product {
  return {
    id: '',
    name: '',
    count: 0,
    dueDate: new Date(),
    done: false,
  };
}

export { getEmptyProduct };
