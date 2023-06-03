import { IAddress } from "../adress/IAddress";
import { IOrderResponse } from "../order/IOrder";
import { IProductResponse } from "../product/iproduct";

export interface IRegister {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  password: string;
  address?: Array<IAddress>;
  orders?: Array<IOrderResponse>;
  favorites?: Array<IProductResponse>;
  confirmPassword: string;
  subscribe: boolean;
  rules: boolean;
}
