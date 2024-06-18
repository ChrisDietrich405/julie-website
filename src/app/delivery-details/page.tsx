"use client";
import React, {useContext, useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {useGetCart} from "../hooks/services/cart";
import {Elements} from "@stripe/react-stripe-js";
import {Box, CircularProgress, Container, Divider, Stack, Typography,} from "@mui/material";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";
import {currencyFormat} from "@/helpers";
import {LoadingButton} from "@mui/lab";
import {userContext} from "@/app/context/userContext";
import {useCreatePaymentIntent} from "@/app/hooks";

const CheckoutForm = dynamic(() => import("@/components/forms/CheckoutForm/CheckoutForm"))

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CreateAccount: React.FC = () => {
  const {user} = useContext(userContext)

  const [clientSecret, setClientSecret] = useState("");
  const [amountFormatted, setAmountFormatted] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const {data, isSuccess: cartSuccess} = useGetCart()
  const cart = data?.data ?? []

  const {mutate, isSuccess} = useCreatePaymentIntent({
    onSuccess: ({data}) => {
      setAmountFormatted(currencyFormat(data.amount));

      setClientSecret(data.clientSecret);
    }
  });

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
    loader: "auto",
  };

  useEffect(() => {
    cartSuccess && mutate(cart)
  }, [cartSuccess]);

  return !clientSecret && !isSuccess ? (
    <Box
      textAlign="center"
      paddingY={2}
      height="64svh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress/>
    </Box>
  ) : (
    <Container maxWidth="xl" sx={{paddingY: 10}}>
      <Typography
        variant="h1"
        sx={{textAlign: 'center', marginBottom: 6, width: '100%'}}
      >
        Delivery and Payment details
      </Typography>
      <Elements
        stripe={stripePromise}
        options={options}
        children={
          <Stack direction="row" columnGap={5}>
            <CheckoutForm
              cart={cart.map(item => item._id)}
              user={user}
              clientSecret={clientSecret}
              onDisabled={(value) => setDisabled(value)}
              onLoad={(load) => setLoading(load)}
            />

            <Stack
              flex={1}
              sx={{
                height: 'fit-content',
                border: "1px solid rgba(0,0,0, 0.2)",
                borderRadius: 1,
                padding: 2,
                gap: 3,
                justifyContent: "space-between",
              }}
            >
              <Stack rowGap={1} divider={<Divider/>}>
                {cart.map(({title, price}, index) => (
                  <Stack key={`product-item-${index}`}>
                    <Typography fontSize={14} fontWeight={500}>
                      {title}
                    </Typography>
                    <Typography fontSize={14} fontStyle="italic">
                      Price: {currencyFormat(price)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack rowGap={1}>
                <Typography fontWeight={500}>
                  Total: {amountFormatted ?? 0}
                </Typography>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                  form="checkout-form"
                  sx={{marginX: "auto"}}
                  disabled={disabled}
                >
                  Confirm payment
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        }
      />
    </Container>
  );
};

export default CreateAccount;
