import {ApplicationApi} from "@/services/base.service";
import {ICartItem} from "@/models";
import {IPaymentIntentResponse} from "@/models/stripe.models";
import {TCustomer, TCustomerResponse, TCustomersDataResponse} from "@/app/models/customer.models";
import {AxiosResponse} from "axios";

export const StripeApi = {
  CreatePaymentIntent: (items: ICartItem[], customerId?: string): Promise<IPaymentIntentResponse> =>
    ApplicationApi.post('/api/payment-intent/create', {items, customerId}),
  RetrievePaymentIntentSecret: (id: string): Promise<AxiosResponse<{ clientSecret: string }>> =>
    ApplicationApi.get(`/api/payment-intent/${id}/secret`),
  CreateCustomer: (data: Partial<TCustomer>): Promise<TCustomerResponse> =>
    ApplicationApi.post('/api/customer/create', data),
  UpdateCustomer: (data: Partial<TCustomer>, customerId?: string,): Promise<TCustomerResponse> =>
    ApplicationApi.patch(`/api/customer/${customerId}`, data),
  SearchCustomer: (email: string): Promise<TCustomersDataResponse> =>
    ApplicationApi.get(`/api/customer/search/${email}`),
  RetrieveCustomer: (customerId: string): Promise<TCustomerResponse> =>
    ApplicationApi.get(`/api/customer/${customerId}`)
}