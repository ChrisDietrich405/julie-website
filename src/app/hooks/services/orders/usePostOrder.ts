import {useMutation, UseMutationOptions} from "@tanstack/react-query";
import {OrdersApi} from "@/services/orders.service";
import {Order} from "@/interfaces";
import {AxiosResponse} from "axios";

type MutationOptions = UseMutationOptions<AxiosResponse<Order>, Error, any, unknown>;

export const usePostOrder = (mutationOptions: MutationOptions = {}) =>
  useMutation({
    mutationKey: ['usePostOrder'],
    mutationFn: (params: any) => OrdersApi.post(params),
    ...mutationOptions
  })
