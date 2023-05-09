import { ICategoryResponse } from "../category/ICategory";

export interface IProductRequest {
  category: ICategoryResponse;
  name: string;
  path: string;
  description?: string;
  weight?: number;
  allergens?: string;
  price: number;
  imagePath: string;
  count: 1;
  culSpecial: boolean;
  noRise: boolean;
}
export interface IProductResponse extends IProductRequest {
  id: string;
}
