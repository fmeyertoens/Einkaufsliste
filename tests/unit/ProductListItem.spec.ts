// Libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// Components
import ProductListItem from '@/components/ProductListItem.vue';

// Utilities
import { mount, createLocalVue } from '@vue/test-utils';

Vue.use(Vuetify);
const localVue = createLocalVue();

describe('ProductListItem.vue', () => {
  let vuetify: typeof Vuetify;
  const mountFunction = (options: object) => {
    return mount(ProductListItem, {
      localVue,
      vuetify,
      ...options,
    });
  };

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('should render a name and count', () => {
    const wrapper = mountFunction({
      propsData: {
        product: {
          id: '1',
          name: 'Apples',
          count: 2,
          dueDate: new Date('2020-06-11T16:10:00Z'),
        },
      },
    });

    // expect(wrapper.html()).toMatchSnapshot();

    const name = wrapper.find('.v-list-item__title');

    expect(name.text()).toBe('2 Apples');
  });

  it('should be marked as done when toggled once', () => {
    const wrapper = mountFunction({
      propsData: {
        product: {
          name: 'Apple',
          count: 1,
          done: false,
        },
      },
    });

    const checkbox = wrapper.find('input[type=checkbox]');

    checkbox.trigger('click');

    expect(wrapper.vm.$props.product.done).toBe(true);
  });
});
