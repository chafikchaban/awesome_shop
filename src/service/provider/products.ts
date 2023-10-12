import { ProductPayload } from '@model/Product.model';
import { ProductsResponse } from '@scenes/home/home.model';

import { Client } from './api_client';

export const getProducts = async (skip: number, limit: number): Promise<ProductsResponse> => {
  return await Client.get<any, any>(`/products?limit=${limit}&skip=${skip}`).then(({ data }) => {
    return data;
  });
};

export const getProduct = async (id: number): Promise<ProductPayload> => {
  return await Client.get<any, any>(`/products/${id}`).then(({ data }) => {
    return data;
  });
};

export const searchProducts = async (searchTerm: string, skip: number, limit: number): Promise<ProductsResponse> => {
  return await Client.get<any, any>(`/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`)
    .then(({ data }) => {
      return data;
    });
};
