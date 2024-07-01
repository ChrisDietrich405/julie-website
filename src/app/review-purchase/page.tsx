"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Button} from "@mui/material";

const ReviewPurchase = () => {
  const [orderCodeState, setOrderCodeState] = useState("");
  const [data, setData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const orderCode = localStorage.getItem("orderCode");
    if (orderCode) {
      setOrderCodeState(orderCode);
    }
  }, []);

  useEffect(() => {
    getOrderDetails();
  }, []);

  // const handleGetOrder = () => {
  //   getOrderCode();
  //   router.push("/receipt");
  // };

  const getOrderDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/orders/${orderCodeState}`
    );
  };

  return (
    <div>
      ReviewPurchase
      <Button>Finalize Purchase</Button>
    </div>
  );
};

export default ReviewPurchase;
