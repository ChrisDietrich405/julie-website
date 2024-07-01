import {AxiosResponse} from "axios";

export interface IPaymentIntentBaseResponse {
  status: number;
  amount: number;
  clientSecret: string;
  id: string;
}

export type IPaymentIntentResponse = AxiosResponse<IPaymentIntentBaseResponse>