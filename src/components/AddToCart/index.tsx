"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "@/contextAPI/artworkAPI";

import { ICartContext } from "@/app/types";

const AddToCart = ({ data }: any) => {
  const {cart, setCart}: ICartContext = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleClick = (data: any) => {
    setOpen(true);
    setDisableBtn(true);
    const positionIndex = cart?.findIndex((cartItem: any) => cartItem.id === data.id);
    debugger
    if (positionIndex === -1) {
      setCart((cart) => [
        ...cart,
        { id: data.id, price: data.price, image: data.image },
      ]);

    }
  };


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {" "}
      <Button
        disabled={disableBtn}
        variant="contained"
        color="secondary"
        onClick={() => handleClick(data)}
      >
        Add to cart
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Item added to cart.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddToCart;
