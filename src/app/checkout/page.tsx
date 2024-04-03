"use client";
import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { cartContext } from "@/app/context/cartContext";

import styles from "./styles.module.css";
import { userContext } from "../context/userContext";

const Checkout = () => {
  const { cart } = useContext(cartContext);
  const { userId } = useContext(userContext);

  const router = useRouter();

  router.prefetch("/login");
  router.prefetch("/delivery-details");

  const handleRedirect = () => {
    if (!userId) {
      router.push("/login");
    } else {
      router.push("/delivery-details");
    }
  };

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    fetch("http://localhost:3000/api/cart", {
      headers: {
        "x-decoded-token": token,
      },
    });
  }, []);

  return (
    <Container className="main-content">
      <table className="table">
        <tr>
          <th>Image</th>
          <th className="text-left">Name</th>
          <th>Measurements</th>
          <th className="text-right">Price</th>
        </tr>

        {cart.map((cartItem) => {
          return (
            <>
              <tr>
                <td>
                  <Image
                    width={100}
                    height={100}
                    alt="Picture of Julie"
                    src="/images/art1.jpg"
                  />
                </td>
                <td>{cartItem.title}</td>
                <td className="text-center"> {cartItem.measurements}</td>
                <td className="text-right">${cartItem.price}</td>
              </tr>
            </>
          );
        })}
      </table>
      <Button
        style={{ margin: "20px 0 0 auto" }}
        className="btn btn-large"
        onClick={handleRedirect}
      >
        Proceed to delivery details
      </Button>
    </Container>
    // <Container className="main-content">
    //   <Grid container spacing={2}>
    //     <Grid item lg={9}>
    //       {cart.map((cartItem) => {
    //         return (
    //           <>
    //             <Card elevation={0}>
    //               <CardContent sx={{ display: "flex", columnGap: 3 }}>
    //                 <Image
    //                   width={333}
    //                   height={333}
    //                   alt="Picture of Julie"
    //                   src="/images/art1.jpg"
    //                 />
    //                 <Stack className={styles.card_content_items}>
    //                   <Typography variant="h3">{cartItem.title}</Typography>
    //                   <Typography variant="h5">${cartItem.price}</Typography>
    //                   <Typography style={{ marginTop: "20px" }}>
    //                     Measurements: {cartItem.measurements}
    //                   </Typography>
    //                   <Button
    //                     style={{ marginTop: "20px" }}
    //                     className="btn btn-large"
    //                     onClick={handleRedirect}
    //                   >
    //                     Proceed to delivery details
    //                   </Button>
    //                 </Stack>
    //               </CardContent>
    //             </Card>
    //           </>
    //         );
    //       })}
    //     </Grid>

    //     <Grid item lg={3}>
    //       {" "}
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default Checkout;
