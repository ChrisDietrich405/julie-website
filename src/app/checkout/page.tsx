"use client";
import React from "react";
import {Box, Container} from "@mui/material";
import {useRouter} from "next/navigation";
import {useGetCart, useRemoveCartItem} from "@/app/hooks/services/cart";
import CheckoutTable from "@/app/components/CheckoutTable";
import {useCreatePaymentIntent} from "@/app/hooks";
import {LoadingButton} from "@mui/lab";

const Checkout = () => {
  const router = useRouter();

  const {data, refetch, isFetching} = useGetCart();

  const {mutate, isPending} = useRemoveCartItem({onSuccess: () => refetch()});

  const {mutate: createPayment, isPending: isIntentPending} = useCreatePaymentIntent({
    onSuccess: ({data}) =>
      router.push(`/delivery-details/${data.clientSecret}`)
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
          loading={isIntentPending}
          variant="contained"
          onClick={() => createPayment(cart?.items ?? [])}
        >
          Proceed to delivery details
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default Checkout;
