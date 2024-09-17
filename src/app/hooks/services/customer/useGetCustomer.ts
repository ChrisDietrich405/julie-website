import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {StripeApi} from "@/services";
import {CustomerResponse} from "@/interfaces/customer.interface";

type QueryOptions = Omit<UseQueryOptions<CustomerResponse, Error>, 'queryKey'>;

type Props = QueryOptions & { customerId: string }

export const useGetCustomer = ({customerId, ...queryOptions}: Props) =>
  useQuery<CustomerResponse>({
    queryKey: ['useGetCustomer'],
    queryFn: () => StripeApi.RetrieveCustomer(customerId),
    ...queryOptions
  })
