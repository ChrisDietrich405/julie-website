import {useQuery, UseQueryOptions, useSuspenseQuery} from "@tanstack/react-query";
import { OrdersApi } from "@/services/orders.service";
import {Order, OrderData} from "@/interfaces";
import { AxiosResponse } from "axios";

type QueryOptions = Omit<UseQueryOptions<OrderData[], Error>, "queryKey">;

export const useGetAllOrders = (queryOptions: QueryOptions = {}) =>
  useSuspenseQuery<OrderData[]>({
    queryKey: ["useGetAllOrders"],
    queryFn: async () => ( await OrdersApi.getAll()).data,
    ...queryOptions,
  });
