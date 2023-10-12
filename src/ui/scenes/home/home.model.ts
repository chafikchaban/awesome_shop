import { ProductPayload } from '@model/Product.model';

export type ProductsResponse = {
  products: ProductsPayload;
  total: number;
  skip: number;
  limit: number;
};

export type ProductsPayload = Array<ProductPayload>;
