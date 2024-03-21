"use client";
import React, { useContext } from "react";
import { cartContext } from "@/app/context/cartContext";
import { Container, Grid } from "@mui/material";
import Typography from "@mui/joy/Typography";

const Contact = () => {
  const { cart } = useContext(cartContext);
  return (
    <Container>
      <Typography level="h1" component="h1">
        Payment success
      </Typography>
    </Container>
  );
};

export default Contact;
