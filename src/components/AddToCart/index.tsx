"use client";

import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  price: number; 
  image: string;
  amount: number;  
}

const AddToCart = ({data}: any) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const handleClick = () => {
    setOpen(true)
    console.log(data)
    const positionIndex = cart.findIndex((cartItem) => cartItem.id === data._id)
    if(positionIndex === -1) {
      setCart([...cart, {id: data._id, price: data.price, image: data.image, amount: 1}])
      console.log(cart)
    } else {
      let newArray = [...cart ] // this gives me all my previous cart properties from one cart
      let selectedItem = newArray[positionIndex]
      console.log(selectedItem)
      selectedItem = {...selectedItem, amount: selectedItem.amount + 1}  
      newArray[positionIndex] = selectedItem
      setCart(newArray)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // useEffect(() => {
  //   if()
  //   const storedData = localStorage.setItem("cart", JSON.stringify(cart));
  //   // console.log(cart)
  // }, [cart]);

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
        return (
          <h1>{item.amount}</h1>
        )
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
