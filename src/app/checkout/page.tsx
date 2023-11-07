"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Grid, Typography } from "@mui/material";
// import { Item } from "./page.styles";

import { CartItem } from "@/types/cartItem";
import { Container } from "@mui/joy";

const Checkout = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      const prevDataJSON: string | null = localStorage.getItem("cart");
      console.log(prevDataJSON);
      if (prevDataJSON) {
        const prevData = JSON.parse(prevDataJSON);
        setCart(prevData);
      }
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }
  }, []);
  return (
    <Container>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
      >
        {cart.map((item, index) => {
          return (
            <Grid key={index} item xs={6}>
              <Image
                // className={styles.image}
                width={333}
                height={333}
                alt="slideshow"
                src={item.image}
              />
              <Typography sx={{ marginBottom: 2 }} component="p">
                Simply fill out the form and I'll be in touch soon.
              </Typography>

              {/* <Link href={`/available-works/${item._id}`}> */}
              <Button variant="contained" color="secondary">
                About
              </Button>
              {/* </Link> */}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Checkout;
