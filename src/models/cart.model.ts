import {AxiosResponse} from "axios";

export interface ICartItem {
  _id: string;
  id: string;
  price: number;
  image: string;
  measurements: string;
  title: string;
  customerId: string;
}

export type ICart = ICartItem[]

export type ICartResponse = AxiosResponse<ICart>
