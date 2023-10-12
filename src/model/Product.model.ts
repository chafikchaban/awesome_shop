export interface ProductPayload {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: Array<string>;
  rating: number;
}
