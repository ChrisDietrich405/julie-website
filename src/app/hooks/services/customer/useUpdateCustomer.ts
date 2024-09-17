import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {Customer, CustomerResponse} from "@/interfaces/customer.interface";

type MutationOptions = UseMutationOptions<CustomerResponse, Error, {
  customerId?: string,
  data: Partial<Customer>
}, unknown>;

export const useUpdateCustomer = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useUpdateCustomer'],
    mutationFn: ({customerId, data}) => StripeApi.UpdateCustomer(data, customerId),
    ...mutationOptions
  })
