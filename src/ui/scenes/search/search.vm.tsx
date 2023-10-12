import debounce from 'debounce-promise';
import { computed, observable } from 'mobx';

import { navigationService } from '@service/navigation/navigation.service';
import { searchProducts } from '@service/provider/products';
import { ProductPayload } from '@model/Product.model';
import { IProductCardVM } from '@scenes/home/components/product-card.component';
import { ProductsPayload, ProductsResponse } from '@scenes/home/home.model';

import { ISearchVM } from './search.component';

const ITEMS_PER_PAGE: number = 10;

export class SearchVM implements ISearchVM {

  @observable public hasMore: boolean = false;
  @observable public loading: boolean = true;
  @observable public refreshing: boolean = false;
  @observable public loadingNext: boolean = false;
  @observable public query: string = '';
  @observable private payload?: ProductsPayload;

  constructor(initialQuery: string) {
    this.query = initialQuery;
    this.fetch();
  }

  @computed public get products(): Array<IProductCardVM> {
    return this.payload?.map(this.createProductVM) || [];
  }

  public search = (query: string): void => {
    this.refreshing = true;
    this.query = query;
    this.fetch(query);
  };

  public refresh = (): void => {
    this.refreshing = true;

    this.fetch();
  };

  public fetchMore = (): void => {
    this.loadingNext = true;

    this.loadMore()
      .then(this.updateValues);
  };

  private get numberOfCards(): number {
    return this.products.length;
  }

  private createProductVM = (payload: ProductPayload): IProductCardVM => {
    return {
      title: payload.title,
      price: `€ ${payload.price}`,
      image: { uri: payload.thumbnail },
      viewDetails: () => this.viewProductDetails(payload.id),
    };
  };

  private viewProductDetails = (productId: number): void => {
    navigationService.goTo('/product/details', { productId });
  };

  private fetch = debounce((): Promise<void> => {

    return searchProducts(this.query, 0, ITEMS_PER_PAGE)
      .then(response => {

        this.payload = response.products;
        this.hasMore = this.numberOfCards === response.total;
        this.loading = false;
        this.refreshing = false;
      })
      .catch(console.error);
  }, 400);

  private updateValues = (response: ProductsResponse): void => {
    this.payload = [...(this.payload || []), ...response.products];
    this.hasMore = this.numberOfCards === response.total;
    this.loadingNext = false;
  };

  private loadMore = (): Promise<ProductsResponse> => {
    return searchProducts(this.query, this.numberOfCards, ITEMS_PER_PAGE);
  };
}
