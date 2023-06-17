
import { IProductResponse } from '../product/iproduct';

export interface IOrderRequest {
  basket: Array<IProductResponse>;
  firstName: string;
  secondName: string;
  phone: number;
  email?: string;
  deliveryType: string;
  place?: string;
  date?: string;
  time?: string;
  city?: string;
  street?: string;
  houseNumber?: number;
  entrance?: string;
  flat?: number;
  flor?: number;
  cod?: number;
  cutleryCount: number;
  payment: string;
  change: boolean;
  banknote?: number;
  callMe: boolean;
  comment?: string;
  total: number;
  status: string;
  atTime: boolean;
  orderDate: string;
}

export interface IOrderResponse extends IOrderRequest {
  id: string;
}
