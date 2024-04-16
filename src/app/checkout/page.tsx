"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cartContext } from "@/app/context/cartContext";
import { userContext } from "../context/userContext";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const { userId } = useContext(userContext);

  const router = useRouter();

  const handleRedirect = () => {
    if (!userId) {
      router.push("/login");
    } else {
      router.push("/delivery-details");
    }
  };

  useEffect(() => {
    const func = async () => {
      const token: any = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          "x-decoded-id": "660dd631e5c7a047f01edebc",
        },
      });
    };
    func()
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
