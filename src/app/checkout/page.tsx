"use client";
import React from "react";
import {Box, Button, Container} from "@mui/material";
import {useRouter} from "next/navigation";
import {useGetCart, useRemoveCartItem} from "@/app/hooks/services/cart";
import CheckoutTable from "@/app/components/CheckoutTable";

const Checkout = () => {
  const router = useRouter();

  const {data, refetch, isFetching} = useGetCart();
  const {mutate, isPending} = useRemoveCartItem({onSuccess: () => refetch()});

  const cart = data?.data ?? [];

  const handleRedirect = () => {
    if (!cart.length) return;

    router.push("/delivery-details");
  };

  return (
    <Container disableGutters>
      <CheckoutTable
        data={cart}
        loading={isFetching || isPending}
        onRemove={(id) => mutate(id)}
      />

      <Box
        sx={{
          marginTop: 5,
          textAlign: 'right'
        }}>

        <Button
          disabled={!cart.length}
          variant="contained"
          onClick={handleRedirect}
        >
          Proceed to delivery details
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
