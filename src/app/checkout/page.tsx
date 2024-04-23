"use client";
import React, { useContext } from "react";
import { Button, Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userContext } from "../context/userContext";
import { useGetCart } from "@/app/hooks/services/cart";

const Checkout = () => {
  const { userId } = useContext(userContext);

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/delivery-details");
  };

  const { data } = useGetCart();

  const cart = data?.data ?? [];

  return (
    <Container className="main-content">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th className="text-left">Name</th>
            <th>Measurements</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((cartItem, index) => {
            return (
              <tr key={`tr-item-${index}`}>
                <td>
                  <Image
                    width={100}
                    height={100}
                    alt={cartItem.title}
                    src={cartItem.image}
                  />
                </td>
                <td>{cartItem.title}</td>
                <td className="text-center"> {cartItem.measurements}</td>
                <td className="text-right">${cartItem.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        style={{ margin: "20px 0 0 auto" }}
        className="btn btn-large"
        onClick={handleRedirect}
      >
        Proceed to delivery details
      </Button>
    </Container>
  );
};

export default Checkout;
