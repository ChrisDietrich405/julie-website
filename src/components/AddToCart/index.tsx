"use client";

import React from "react";
import {useGetCart, useUpdateCart} from "@/app/hooks/services/cart";
import {LoadingButton} from "@mui/lab";

const AddToCart = ({id}: { id: string }) => {
  const {data, refetch, isFetching} = useGetCart();

  const {mutate, isPending} = useUpdateCart({
    onSuccess: () => {
      refetch()
    }
  });

  const cart = data?.data ?? []

  const cartIds = [...cart].map(item => item._id);

  return (
    <div>
      {" "}
      <LoadingButton
        variant="contained"
        loading={isPending || isFetching}
        disabled={cartIds.includes(id)}
        color="secondary"
        onClick={() => mutate([...cartIds, id])}
      >
        Add to cart
      </LoadingButton>
    </div>
  );
};

export default AddToCart;
