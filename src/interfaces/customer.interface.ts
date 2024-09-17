import Stripe from "stripe";
import {AxiosResponse} from "axios";

export type Customer = Stripe.Customer;
export type CustomerResponse = Stripe.Response<Stripe.Customer>;


export type TCustomerDataResponse = AxiosResponse<CustomerResponse>
export type TCustomersDataResponse = AxiosResponse<CustomerResponse[]>