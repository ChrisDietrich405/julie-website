import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {ICartItem} from "@/models";
import {IPaymentIntentResponse} from "@/models/stripe.models";

type MutationOptions = UseMutationOptions<IPaymentIntentResponse, Error, {
  items: ICartItem[],
  customerId?: string
}, unknown>;

export const useCreatePaymentIntent = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreatePaymentIntent'],
    mutationFn: ({items, customerId}) => StripeApi.CreatePaymentIntent(items, customerId),
    ...mutationOptions
  })
