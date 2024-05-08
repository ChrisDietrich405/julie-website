import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {UserApi} from "@/services";
import {IUserResponse} from "@/models";
import {ApplicationApi} from "@/services/base.service";

type QueryOptions = Omit<UseQueryOptions<IUserResponse, Error>, 'queryKey'> & { token: string};

export const useGetUser = (queryOptions: QueryOptions) =>
  useQuery<IUserResponse>({
    queryKey: ['useGetUser', queryOptions.token],
    queryFn: async () => UserApi.getOne(),
    ...queryOptions
  })
