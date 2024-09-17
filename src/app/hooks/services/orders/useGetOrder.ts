import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {OrdersApi} from "@/services/orders.service";
import {Order} from "@/interfaces";
import {AxiosResponse} from "axios";

type QueryOptions = Omit<UseQueryOptions<AxiosResponse<Order>, Error>, 'queryKey'>;

export const useGetOrder = (id: string, queryOptions: QueryOptions = {}) =>
  useQuery<AxiosResponse<Order>>({
    queryKey: ['useGetOrder', id],
    queryFn: () => OrdersApi.getOne(id),
    ...queryOptions
  })
