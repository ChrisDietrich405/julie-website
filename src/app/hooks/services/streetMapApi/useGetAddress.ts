import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CartApi, StreetMapApi} from "@/services";
import {ICartResponse} from "@/models";

type QueryOptions = Omit<UseQueryOptions<any, Error>, 'queryKey'>;

export const useGetAddress = (search: string, queryOptions: QueryOptions = {}) =>
  useQuery({
    queryKey: ['useGetAddress', search],
    queryFn: () => StreetMapApi.get(search),
    gcTime:  24 * 60 * 60 * 1000,
    ...queryOptions
  })
