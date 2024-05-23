import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {CartApi, StreetMapApi} from "@/services";
import {ICartResponse} from "@/models";

type QueryOptions = Omit<UseQueryOptions<any, Error>, 'queryKey'>;

export const useGetCity = (coordinates: {lat: string, lon: string}, queryOptions: QueryOptions = {}) =>
  useQuery({
    queryKey: ['useGetCity', coordinates.lat, coordinates.lon],
    queryFn: () => StreetMapApi.getCity(coordinates),
    ...queryOptions
  })
