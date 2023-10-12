import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

import { AppUI } from '@app/app-ui';

import { IProductDetailsVM, ProductDetails } from './product-details.component';

describe('Product Details Screen', () => {

  class TestVM implements IProductDetailsVM {

    public loading = false;
    public title = 'Title';
    public price = '€ 50';
    public category = 'Category';
    public brand = 'Brand';
    public description = 'Description';
    public discount = 'discount';
    public rating = 5;
    public images = [{ uri: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg' }];
  }

  let vm: TestVM;

  beforeAll(() => {
    jest
      .useFakeTimers({
        doNotFake: [
          'setImmediate',
          'setInterval',
          'setTimeout',
          'cancelAnimationFrame',
          'cancelIdleCallback',
          'clearImmediate',
          'clearInterval',
          'clearTimeout',
          'nextTick',
          'queueMicrotask',
        ],
      });
  });

  beforeEach(() => {
    vm = new TestVM();
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  const HomeComponent: React.FC<{ vm: IProductDetailsVM }> = (props) => (
    <AppUI>
      <ProductDetails {...props} />
    </AppUI>
  );

  it('product info is rendered', () => {
    const api: RenderAPI = render(<HomeComponent vm={vm} />);

    expect(api.findByText('Title')).toBeTruthy();
    expect(api.findByText('€ 50')).toBeTruthy();
    expect(api.findByText('Category')).toBeTruthy();
    expect(api.findByText('Brand')).toBeTruthy();
    expect(api.findByText('Description')).toBeTruthy();
    expect(api.findByText('discount')).toBeTruthy();
    expect(api.findByTestId('@product-details/swiper-image')).toBeTruthy();
  });

});

