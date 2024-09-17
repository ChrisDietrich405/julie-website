import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {UserApi} from "@/services";
import {User} from "@/interfaces";

type QueryOptions = Omit<UseQueryOptions<User, Error>, 'queryKey'> & { token: string};

export const useGetUser = (queryOptions: QueryOptions) =>
  useQuery<User>({
    queryKey: ['useGetUser', queryOptions.token],
    queryFn: async () => UserApi.getOne(),
    ...queryOptions
  })
