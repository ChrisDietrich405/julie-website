import Stripe from "stripe";
import {AxiosResponse} from "axios";

export type TCustomer = Stripe.Customer;
export type TCustomerResponse = Stripe.Response<Stripe.Customer>;


export type TCustomerDataResponse = AxiosResponse<TCustomerResponse>
export type TCustomersDataResponse = AxiosResponse<TCustomerResponse[]>