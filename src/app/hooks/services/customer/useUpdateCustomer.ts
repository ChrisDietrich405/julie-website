import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {TCustomer, TCustomerResponse} from "@/app/models/customer.models";

type MutationOptions = UseMutationOptions<TCustomerResponse, Error, {
  customerId?: string,
  data: Partial<TCustomer>
}, unknown>;

export const useUpdateCustomer = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useUpdateCustomer'],
    mutationFn: ({customerId, data}) => StripeApi.UpdateCustomer(data, customerId),
    ...mutationOptions
  })
