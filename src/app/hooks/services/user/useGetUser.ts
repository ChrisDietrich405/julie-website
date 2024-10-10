import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { UserApi } from "@/services";
import { UserData } from "@/interfaces";

type QueryOptions = Omit<UseQueryOptions<UserData, Error>, "queryKey"> & {
  token: string;
};

export const useGetUser = (queryOptions: QueryOptions) =>
  useQuery<UserData>({
    queryKey: ["useGetUser", queryOptions.token],
    queryFn: async () => UserApi.getOne(),
    ...queryOptions,
    staleTime: 0,
    gcTime: 0,
  });
