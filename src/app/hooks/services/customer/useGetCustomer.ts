import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {TCustomerResponse} from "@/app/models/customer.models";

type QueryOptions = Omit<UseQueryOptions<TCustomerResponse, Error>, 'queryKey'>;

type Props = QueryOptions & { customerId: string }

export const useGetCustomer = ({customerId, ...queryOptions}: Props) =>
  useQuery<TCustomerResponse>({
    queryKey: ['useGetCustomer'],
    queryFn: () => StripeApi.RetrieveCustomer(customerId),
    ...queryOptions
  })
