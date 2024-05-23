import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CartApi} from "@/services";
import {ICartResponse, TOrderResponse} from "@/models";
import {OrdersApi} from "@/services/orders.service";

type QueryOptions = Omit<UseQueryOptions<TOrderResponse, Error>, 'queryKey'>;

export const useGetOneOrder = (id: string, queryOptions: QueryOptions = {}) =>
  useQuery<TOrderResponse>({
    queryKey: ['useGetOneOrder', id],
    queryFn: () => OrdersApi.getOne(id, true),
    ...queryOptions
  })
