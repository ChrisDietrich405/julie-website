import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {TAvailableWorksResponse} from "@/models";
import {AvailableWorksApi} from "@/services";

type QueryOptions = Omit<UseQueryOptions<TAvailableWorksResponse, Error>, 'queryKey'>;

export const useGetAllAvailableWorks = (queryOptions: QueryOptions = {}) =>
  useQuery<TAvailableWorksResponse>({
    queryKey: ['useGetAllAvailableWorks'],
    queryFn: () => AvailableWorksApi.getAll(),
    ...queryOptions
  })
