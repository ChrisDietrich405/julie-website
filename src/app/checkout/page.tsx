"use client";
import React, {useContext} from "react";
import {Box, Container} from "@mui/material";
import {useRouter} from "next/navigation";
import {useGetCart, useRemoveCartItem} from "@/app/hooks/services/cart";
import CheckoutTable from "@/app/components/CheckoutTable";
import {useCreatePaymentIntent} from "@/app/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import {userContext} from "@/app/context/userContext";
import {useSearchCustomer, useUpdateCustomer} from "@/app/hooks/services/customer";
import {useCreateCustomer} from "@/app/hooks/services/customer/useCreateCustomer";

const Checkout = () => {
  const router = useRouter();
  const {user} = useContext(userContext)

  const {data, refetch, isFetching} = useGetCart({enabled: false});

  const {mutate, isPending} = useRemoveCartItem({onSuccess: () => refetch()});

  const {refetch: searchCustomer, isFetching: searchLoading} = useSearchCustomer({
    email: user?.email ?? '',
    enabled: false
  })

  const {mutateAsync: createCustomer, isPending: createCustomerLoading} = useCreateCustomer();
  const {mutateAsync: updateCustomer, isPending: updateCustomerLoading} = useUpdateCustomer();

  const {mutate: createPayment, isPending: isIntentPending} = useCreatePaymentIntent({
    onSuccess: async ({data}) => {

      const {data: searchResponse} = await searchCustomer()

      const customerFounded = searchResponse?.data;

      if (!customerFounded?.length && user) {

        await createCustomer({
          ...user, metadata: {
            payment_intent: data.id
          }
        })
      } else {

        await updateCustomer({
          customerId: customerFounded?.[0]?.id,
          data: {
            metadata: {
              payment_intent: data.id
            }
          }
        })
      }
      router.push(`/delivery-details/${data.id}`)
    }
  });


  const cart = data?.data;

  return (
    <Container disableGutters>
      <CheckoutTable
        data={cart?.items ?? []}
        loading={isFetching || isPending}
        onRemove={(id) => mutate(id)}
      />

      <Box
        sx={{
          marginTop: 5,
          textAlign: 'right'
        }}>

        <LoadingButton
          disabled={!cart?.items.length}
          loading={isIntentPending || searchLoading || createCustomerLoading || updateCustomerLoading}
          variant="contained"
          onClick={() => createPayment({items: cart?.items ?? []})}
        >
          Proceed to delivery details
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default Checkout;
