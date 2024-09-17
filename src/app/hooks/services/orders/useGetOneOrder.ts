import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import { Order } from "@/interfaces";
import {OrdersApi} from "@/services/orders.service";
import {AxiosResponse} from "axios";

type QueryOptions = Omit<UseQueryOptions<AxiosResponse<Order>, Error>, 'queryKey'>;

export const useGetOneOrder = (id: string, queryOptions: QueryOptions = {}) =>
  useQuery<AxiosResponse<Order>>({
    queryKey: ['useGetOneOrder', id],
    queryFn: () => OrdersApi.getOne(id, true),
    ...queryOptions
  })
