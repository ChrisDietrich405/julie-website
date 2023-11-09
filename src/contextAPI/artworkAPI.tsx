"use client";
import React, { createContext, useEffect, useState } from "react";
import { ICartContext } from "@/app/types";

const initialState: ICartContext = {
  cart: [],
  setCart: () => {},
};

export const CartContext = createContext<ICartContext>(initialState);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState([] as any);

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      const cartData = JSON.parse(storedData);
      setCart(cartData);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );  
};
