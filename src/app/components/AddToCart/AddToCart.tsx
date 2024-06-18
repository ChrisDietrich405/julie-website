"use client";

import React, {MouseEvent, useState} from "react";
import {useGetCart, useRemoveCartItem, useUpdateCart} from "@/app/hooks/services/cart";
import {LoadingButton} from "@mui/lab";
import {ButtonProps} from "@mui/material";
import {usePathname, useRouter} from "next/navigation";
import {AddShoppingCart, RemoveShoppingCart} from "@mui/icons-material";

const AddToCart: React.FC<{ id: string } & ButtonProps> = ({id, ...props}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [idAction, setIdAction] = useState<null | string>(null);

  const {data, refetch, isFetching} = useGetCart({enabled: false});

  const {mutate, isPending} = useUpdateCart({
    onSuccess: () => {
      refetch()
    }
  });

  const {mutate: removeItem} = useRemoveCartItem({
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

    setIdAction(id)

    if (!idIsUnique) {
      return removeItem(id);
    }

    const value = await refetch();

    if (value.status === 'error') {
      return router.replace(`/auth/login?url=${pathname}`)
    }

    mutate([...cartIds, id])
  }

  return (
    <LoadingButton
      variant="contained"
      loading={isPending || (idAction === id && isFetching)}
      color={idIsUnique ? 'secondary' : 'error'}
      onClick={onClick}
      endIcon={idIsUnique ? <AddShoppingCart/> : <RemoveShoppingCart/>}
      {...props}
    >
      {idIsUnique ? 'Add to cart' : 'Remove from cart'}
    </LoadingButton>
  );
};

export default AddToCart;
