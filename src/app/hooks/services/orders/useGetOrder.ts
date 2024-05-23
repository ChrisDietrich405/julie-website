import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CartApi} from "@/services";
import {ICartResponse, TOrderResponse} from "@/models";
import {OrdersApi} from "@/services/orders.service";

type QueryOptions = Omit<UseQueryOptions<TOrderResponse, Error>, 'queryKey'>;

export const useGetOrder = (id: string, queryOptions: QueryOptions = {}) =>
  useQuery<TOrderResponse>({
    queryKey: ['useGetOrder', id],
    queryFn: () => OrdersApi.get(id),
    ...queryOptions
  })
