"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CartItem } from "@/types/cartItem";

const AddToCart = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [disableBtn, setDisableBtn] = useState(false);


  const handleClick = () => {
    setOpen(true);
    setDisableBtn(true);
  
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === data._id);
  
    if (existingItemIndex === -1) {
      // If the item is not in the cart, add it with a quantity of 1
      setCart([...cart, { id: data._id, price: data.price, image: data.image, amount: 1 }]);
    } else {
      // If the item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        amount: updatedCart[existingItemIndex].amount + 1,
      };
      setCart(updatedCart);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  

  // const handleClick = () => {
  //   setOpen(true);

  //   const positionIndex = cart.findIndex(
  //     (cartItem) => cartItem.id === data._id
  //   );
  //   if (positionIndex === -1) {
  //     setCart([
  //       ...cart,
  //       { id: data._id, price: data.price, image: data.image, amount: 1 },
  //     ]);
  //   } else {
  //     let newArray = [...cart];
  //     newArray[positionIndex] = {
  //       ...newArray[positionIndex],
  //       amount: newArray[positionIndex].amount + 1,
  //     };
  //     setCart(newArray);
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

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
      <Button
        variant="contained"
        disabled={disableBtn}
        color="secondary"
        onClick={handleClick}
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
