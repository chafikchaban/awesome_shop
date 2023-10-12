import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

import { AppUI } from '@app/app-ui';

import { IProductCardVM } from './components/product-card.component';
import { Home, IHomeVM } from './home.component';

const exampleProduct: IProductCardVM = {
  title: 'title',
  price: '€ 50',
  image: { uri: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg' },
  viewDetails: jest.fn(),
};

describe('Home Screen', () => {

  class TestVM implements IHomeVM {

    public loading = false;
    public refreshing = false;
    public loadingNext = false;
    public hasMore = true;

    public products = [exampleProduct];

    public search = jest.fn();

    public refresh = jest.fn();

    public fetchMore = jest.fn();
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

  const HomeComponent: React.FC<{ vm: IHomeVM }> = (props) => (
    <AppUI>
      <Home {...props} />
    </AppUI>
  );

  it('empty state is rendered', () => {
    const tempVM: IHomeVM = { ...vm, products: [] };
    const api: RenderAPI = render(<HomeComponent vm={tempVM} />);

    expect(api.findByTestId('@home/empty-list')).toBeTruthy();
  });

  it('products are rendered', () => {
    const api: RenderAPI = render(<HomeComponent vm={vm} />);

    expect(api.findByTestId('@home/product-card')).toBeTruthy();
  });
});

