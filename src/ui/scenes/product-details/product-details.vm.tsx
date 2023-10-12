import { ImageSourcePropType } from 'react-native';
import { computed, observable } from 'mobx';

import { getProduct } from '@service/provider/products';
import { ProductPayload } from '@model/Product.model';

import { IProductDetailsVM } from './product-details.component';

export class ProductDetailsVM implements IProductDetailsVM {

  constructor(productId: number) {
    this.fetch(productId);
  }

  @observable private payload?: ProductPayload;

  @computed public get loading(): boolean {
    return !this.payload;
  }

  @computed public get title(): string {
    return this.payload?.title || '';
  }

  @computed public get description(): string {
    return this.payload?.description || '';
  }

  @computed public get brand(): string {
    return this.payload?.brand || '';
  }

  @computed public get category(): string {
    return this.payload?.category || '';
  }

  @computed public get rating(): number {
    return this.payload?.rating || 0;
  }

  @computed public get images(): Array<ImageSourcePropType> {
    return this.payload?.images.map((uri: string) => ({ uri })) || [];
  }

  @computed public get price(): string {
    return this.payload && `€ ${this.payload.price}` || '';
  }

  @computed public get discount(): string {
    return this.payload?.discountPercentage && `-${this.payload?.discountPercentage.toString()} %` || '';
  }

  private fetch = async (productId: number): Promise<void> => {
    this.payload = await getProduct(productId);
  };
}
