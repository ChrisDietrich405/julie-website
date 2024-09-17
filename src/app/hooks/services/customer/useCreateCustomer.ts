import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {Customer, CustomerResponse} from "@/interfaces/customer.interface";

type MutationOptions = UseMutationOptions<CustomerResponse, Error, Partial<Customer>, unknown>;

export const useCreateCustomer = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreateCustomer'],
    mutationFn: (data) => StripeApi.CreateCustomer(data),
    ...mutationOptions
  })
