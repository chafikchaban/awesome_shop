import { action, computed, observable } from 'mobx';

import { navigationService } from '@service/navigation/navigation.service';
import { getProducts } from '@service/provider/products';
import { ProductPayload } from '@model/Product.model';

import { IProductCardVM } from './components/product-card.component';
import { IHomeVM } from './home.component';
import { ProductsPayload, ProductsResponse } from './home.model';

const ITEMS_PER_PAGE: number = 10;

export class HomeVM implements IHomeVM {

  @observable private payload?: ProductsPayload;
  @observable public loading: boolean = true;
  @observable public refreshing: boolean = false;
  @observable public loadingNext: boolean = false;
  @observable public hasMore: boolean = false;

  public onMount(): void {
    this.fetch();
  }

  @computed public get products(): Array<IProductCardVM> {
    return this.payload?.map(this.createProductVM) || [];
  }

  public search = (query: string): void => {
    navigationService.goTo('/search', { query });
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

  private createProductVM = (payload: ProductPayload): IProductCardVM => {
    return {
      title: payload.title,
      price: `€ ${payload.price}`,
      image: { uri: payload.thumbnail },
      viewDetails: () => this.viewProductDetails(payload.id),
    };
  };

  @action private fetch = async (): Promise<void> => {

    await getProducts(0, ITEMS_PER_PAGE)
      .then(response => {
        this.payload = response.products;
        this.hasMore = this.numberOfCards === response.total;
        this.loading = false;
        this.refreshing = false;
      });
  };

  private viewProductDetails = (productId: number): void => {
    navigationService.goTo('/product/details', { productId });
  };

  private updateValues = (response: ProductsResponse): void => {
    this.payload = [...(this.payload || []), ...response.products];
    this.hasMore = this.numberOfCards === response.total;
    this.loadingNext = false;
  };

  private get numberOfCards(): number {
    return this.products.length;
  }

  private loadMore = (): Promise<ProductsResponse> => {
    return getProducts(this.numberOfCards, ITEMS_PER_PAGE);
  };
}
