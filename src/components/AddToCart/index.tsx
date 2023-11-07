"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CartItem } from "@/types/cartItem";

const AddToCart = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleClick = () => {
    setOpen(true);

    const positionIndex = cart.findIndex(
      (cartItem) => cartItem.id === data._id
    );
    if (positionIndex === -1) {
      setCart([
        ...cart,
        { id: data._id, price: data.price, image: data.image, amount: 1 },
      ]);
    } else {
      let newArray = [...cart]; // this gives me all my previous cart properties from one cart
      newArray[positionIndex] = {
        ...newArray[positionIndex],
        amount: newArray[positionIndex].amount + 1,
      };
      setCart(newArray);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
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

  useEffect(() => {
    try {
      const prevDataJSON: string | null = localStorage.getItem("cart");
      if (prevDataJSON) {
        const prevData = JSON.parse(prevDataJSON);
        setCart(prevData);
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }
  }, []);

  return (
    <div>
      {" "}
      <Button variant="contained" color="secondary" onClick={handleClick}>
        Add to cart
      </Button>
      {cart.map((item) => {
        return <h1>{item.amount}</h1>;
      })}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Item added to cart.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddToCart;
