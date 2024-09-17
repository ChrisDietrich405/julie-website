import {ApplicationApi} from "@/services/base.service";
import {IPaymentIntentResponse, AvailableWork} from "@/interfaces";
import {Customer, CustomerResponse, TCustomersDataResponse} from "@/interfaces/customer.interface";
import {AxiosResponse} from "axios";

export const StripeApi = {
  CreatePaymentIntent: (items: AvailableWork[], customerId?: string): Promise<IPaymentIntentResponse> =>
    ApplicationApi.post('/api/payment-intent/create', {items, customerId}),
  RetrievePaymentIntentSecret: (id: string): Promise<AxiosResponse<{ clientSecret: string }>> =>
    ApplicationApi.get(`/api/payment-intent/${id}/secret`),
  CreateCustomer: (data: Partial<Customer>): Promise<CustomerResponse> =>
    ApplicationApi.post('/api/customer/create', data),
  UpdateCustomer: (data: Partial<Customer>, customerId?: string,): Promise<CustomerResponse> =>
    ApplicationApi.patch(`/api/customer/${customerId}`, data),
  SearchCustomer: (email: string): Promise<TCustomersDataResponse> =>
    ApplicationApi.get(`/api/customer/search/${email}`),
  RetrieveCustomer: (customerId: string): Promise<CustomerResponse> =>
    ApplicationApi.get(`/api/customer/${customerId}`)
}