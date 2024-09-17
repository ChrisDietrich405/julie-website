import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {IPaymentIntentResponse} from "@/interfaces/stripe.interface";
import {AvailableWork} from "@/interfaces/availableWork.interface";

type MutationOptions = UseMutationOptions<IPaymentIntentResponse, Error, {
  items: AvailableWork[],
  customerId?: string
}, unknown>;

export const useCreatePaymentIntent = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['useCreatePaymentIntent'],
    mutationFn: ({items, customerId}) => StripeApi.CreatePaymentIntent(items, customerId),
    ...mutationOptions
  })
