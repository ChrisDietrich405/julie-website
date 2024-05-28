"use client";

import React, {MouseEvent, useContext} from "react";
import {useGetCart, useUpdateCart} from "@/app/hooks/services/cart";
import {LoadingButton} from "@mui/lab";
import {ButtonProps} from "@mui/material";
import {useRouter, usePathname} from "next/navigation";
import {SnackbarContext} from "@/app/context/snackbarContext";

const AddToCart: React.FC<{id: string} & ButtonProps> = ({id, ...props}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { openError } = useContext(SnackbarContext);

  const {data, refetch, isFetching} = useGetCart({enabled: false, });

  const {mutate, isPending} = useUpdateCart({
    onSuccess: () => {
      refetch()
    }
  });

  const cart = data?.data ?? []

  const cartIds = [...cart].map(item => item._id);

  const idIsUnique = !cartIds.includes(id);

  const onClick = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()
    const value = await refetch();

    if (value.status === 'error') {
      return router.replace(`/auth/login?url=${pathname}`)
    }

    if (cartIds.includes(id)) {
      return openError('Available work already in cart')
    }

    mutate([...cartIds, id])
  }

  return (
    <LoadingButton
      variant="contained"
      loading={isPending || isFetching}
      disabled={!idIsUnique}
      color="secondary"
      onClick={onClick}
      {...props}
    >
      { idIsUnique ? 'Add to cart' : 'In cart' }
    </LoadingButton>
  );
};

export default AddToCart;
