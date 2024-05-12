import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {StripeApi, UserApi} from "@/services";
import {ICartItem, IUserResponse} from "@/models";
import {IPaymentIntentResponse} from "@/models/stripe.models";

type MutationOptions = UseMutationOptions<IPaymentIntentResponse, Error, ICartItem[], unknown>;

export const useCreatePaymentIntent = (mutationOptions: MutationOptions = {}) =>
  useMutation<IPaymentIntentResponse>({
    mutationKey: ['useCreatePaymentIntent'],
    mutationFn: (items: ICartItem[]) => StripeApi.CreatePaymentIntent(items),
    ...mutationOptions
  })
