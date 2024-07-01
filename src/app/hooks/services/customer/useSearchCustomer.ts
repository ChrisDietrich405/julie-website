import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {TCustomersDataResponse} from "@/app/models/customer.models";

type QueryOptions = Omit<UseQueryOptions<TCustomersDataResponse, Error>, 'queryKey'>;

type Props = QueryOptions & { email: string }

export const useSearchCustomer = ({email, ...queryOptions}: Props) =>
  useQuery<TCustomersDataResponse>({
    queryKey: ['useSearchCustomer'],
    queryFn: () => StripeApi.SearchCustomer(email),
    ...queryOptions
  })
