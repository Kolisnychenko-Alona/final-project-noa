import { IAddress } from "../adress/IAddress";

export interface IRegister {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  password: string;
  address?: Array<IAddress>;
  confirmPassword: string;
  subscribe: boolean;
  rules: boolean;
}
