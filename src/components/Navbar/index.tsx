"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { CartItem } from "@/types/cartItem";

const navLinks = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Contact",
    route: "/contact",
  },
  {
    title: "Portfolio",
    route: "/portfolio",
  },
  {
    title: "Available Works",
    route: "/available-works",
  },
  {
    title: "Book",
    route: "/book",
  },
];

export default function Navbar() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const appBarStyle = {
    backgroundColor: "white",
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Julie Dietrich Art
          </Typography>
          {navLinks.map((navLink, index) => {
            return (
              <Link key={index} href={navLink.route} passHref>
                <Button sx={{ mx: 2 }} variant="text" className="btn">
                  {navLink.title}
                </Button>
              </Link>
            );
          })}
          <Link href="/checkout">
            {cart.map((item) => {
              return (
                <span style={{position: "absolute", top: "2px", right: "27px", color: "#000"}}>{item.amount}</span>
              );
            })}
            <ShoppingCartIcon sx={{ color: "#000" }} />
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
