import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {CartApi} from "@/services";
import {OrdersApi} from "@/services/orders.service";
import {TOrderResponse} from "@/models";

type MutationOptions = UseMutationOptions<TOrderResponse, Error, any, unknown>;

export const usePostOrder = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['usePostOrder'],
    mutationFn: (params: any) => OrdersApi.post(params),
    ...mutationOptions
  })
