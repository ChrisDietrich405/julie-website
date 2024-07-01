import {UseMutationOptions, useQuery} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {AxiosResponse} from "axios";

type MutationOptions = UseMutationOptions<AxiosResponse<{ clientSecret: string }>, Error, number, unknown> & {
  id: string
};

export const useRetrievePaymentIntentSecret = ({id, ...mutationOptions}: MutationOptions) =>
  useQuery({
    queryKey: ['useRetrievePaymentIntent', id],
    queryFn: () => StripeApi.RetrievePaymentIntentSecret(id),
    ...mutationOptions
  })
