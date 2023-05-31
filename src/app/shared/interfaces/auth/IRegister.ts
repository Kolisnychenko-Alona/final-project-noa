import { IAddress } from "../adress/IAddress";
import { IOrderResponse } from "../order/IOrder";

export interface IRegister {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  password: string;
  address?: Array<IAddress>;
  orders?: Array<IOrderResponse>;
  confirmPassword: string;
  subscribe: boolean;
  rules: boolean;
}
