import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {TCustomer, TCustomerResponse} from "@/app/models/customer.models";

type MutationOptions = UseMutationOptions<TCustomerResponse, Error, Partial<TCustomer>, unknown>;

export const useCreateCustomer = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreateCustomer'],
    mutationFn: (data) => StripeApi.CreateCustomer(data),
    ...mutationOptions
  })
