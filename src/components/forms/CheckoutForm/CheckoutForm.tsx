import React, { FormEvent, useState } from "react";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Alert, Button, Snackbar, Stack, Box } from "@mui/material";
import { StripeElementType } from "@stripe/stripe-js";

const CheckoutForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    elements?.submit();

    const response = await stripe?.confirmPayment({
      elements: elements ?? undefined,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success",
      },
    });

    if (response?.error) {
      setOpen(true);
      setError(response.error?.message ?? "");
    }
  };

  const handleChange = async ({
    elementType,
  }: {
    elementType: StripeElementType;
  }) => {
    if (elementType === "address") {
      const stripeElement = elements?.getElement(elementType);

      const elementValue = await stripeElement?.getValue();

      setDisabled(!elementValue);
    }
  };

  return (
    <Stack rowGap={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ width: "80dvw" }}
      >
        <Stack
          gap={6}
          direction="row"
          sx={{ width: "70dvw" }}
          justifyContent="space-between"
        >
          <Box flex={2}>
            <h3>Contact info</h3>
            <LinkAuthenticationElement
              options={{
                defaultValues: {
                  email: "test@gmail.com",
                },
              }}
            />
            <h3>Address</h3>
            <AddressElement
              onChange={handleChange}
              options={{
                mode: "shipping",
                fields: {
                  phone: "always",
                },
                validation: {
                  phone: {
                    required: "always",
                  },
                },
              }}
            />
          </Box>
          <Box flex={1}>
            <h3>Payment</h3>
            <PaymentElement
              options={{
                defaultValues: {
                  billingDetails: {
                    name: "John Doe",
                    phone: "888-888-8888",
                    address: {
                      postal_code: "10001",
                      country: "US",
                    },
                  },
                },
              }}
            />
          </Box>
        </Stack>
        <Button
          variant="contained"
          type="submit"
          disabled={disabled}
          sx={{ marginX: "auto" }}
        >
          Confirm payment
        </Button>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
