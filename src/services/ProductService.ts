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

function getProducts(): Product[] {
  return mockData;
}

export { getProducts };
