import emailjs from "@emailjs/browser";
import React, { FormEvent, useContext, useEffect, useState } from "react";

import { Alert, Box, Snackbar, Stack } from "@mui/material";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useGetCart, usePostOrder, useUpdateCart } from "@/app/hooks";
import { useUpdateCustomer } from "@/app/hooks/services/customer";
import { SnackbarContext } from "@/context/snackbarContext";
import { currencyFormat } from "@/helpers";
import { AvailableWork } from "@/interfaces";
import { Customer } from "@/interfaces/customer.interface";
import { useRouter } from "next/navigation";

function addressToString(address: Customer["address"]) {
  if (!address) return null;

  return `${address.line1} - ${address.city} - ${address.state} - ${address.postal_code}`;
}

function calcPrice(items: AvailableWork[] = []) {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return currencyFormat(totalPrice);
}

function cartItems(data: AvailableWork[] = []) {
  let str = "";
  data.forEach((item) => {
    str += `${item.title} ${currencyFormat(item.price)} \n`;
  });
  return str;
}

function cartImage(data: AvailableWork[] = []) {
  let str = "";
  data.forEach((item) => {
    str += `<img width="100px" src="https://julie-website-amber.vercel.app/${item.image}"/>`;
  });
  return str;
}

type CheckoutFormProps = {
  cart: string[];
  clientSecret: string;
  onDisabled: (disabled: boolean) => void;
  onLoad: (load: boolean) => void;
  customer?: Customer;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  customer,
  onDisabled,
  cart,
  onLoad,
}) => {
  const route = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { openError } = useContext(SnackbarContext);

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerAddress, setCustomerAddress] = useState<Customer["address"]>(
    customer?.address
  );

  const { refetch, data: cartData } = useGetCart({ enabled: false });

  const { mutateAsync: mutateUpdateCustomer } = useUpdateCustomer();

  const { mutate: updateCart, isPending: updateCartLoading } = useUpdateCart({
    onSuccess: () => refetch(),
  });

  const { mutateAsync, isPending } = usePostOrder({
    onSuccess: async (res) => {
      setLoading(true);

      await stripe?.confirmPayment({
        elements: elements ?? undefined,
        clientSecret,
        redirect: "if_required",
      });

      if (customer?.name) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
          {
            name: customer.name,
            address: addressToString(customer.address),
            phone: customer.phone,
            email: customer.email,
            items: cartItems(cartData?.data.items),
            totalPrice: calcPrice(cartData?.data.items),
            image: cartImage(cartData?.data.items),
          },
          process.env.NEXT_PUBLIC_USER_ID as string
        );
      }

      route.push(`/payment-success/${res.data.orderId}`);

      setTimeout(() => updateCart([]), 2000);
    },

    onError: () => {
      setOpen(true);
      setError("We have a problem");
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    elements
      ?.submit()
      .then(async (data) => {
        const { value } =
          (await elements?.getElement("address")?.getValue()) ?? {};

        if (data.error) throw new Error("invalid field");

        if (!value) return;
        await mutateAsync({
          price: calcPrice(cartData?.data.items),
          availableWorks: cart,
          customer: {
            name: value?.name,
            phoneNumber: value?.phone,
          },
          deliveryAddress: {
            streetAddress: value?.address.line1,
            city: value?.address.city,
            zipCode: value?.address.postal_code,
          },
        });

        await mutateUpdateCustomer({
          customerId: customer?.id,
          // @ts-ignore
          data: value,
        });
      })
      .catch(() => {
        openError("Failed submit");
      })
      .finally(() => setLoading(false));
  };

  const handleAddressChange = async () => {
    const stripeElement = elements?.getElement("address");

    const elementValue = await stripeElement?.getValue();

    onDisabled(!elementValue);
  };

  useEffect(() => {
    onLoad(isPending || updateCartLoading || loading);
  }, [isPending, updateCartLoading, loading]);

  useEffect(() => {
    setCustomerAddress(customer?.address);
  }, [customer?.address]);

  return (
    <Stack gap={2}>
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
      <form id="checkout-form" onSubmit={(event) => handleSubmit(event)}>
        <Stack
          gap={6}
          direction="row"
          sx={{ width: "70dvw" }}
          justifyContent="space-between"
        >
          {customer && (
            <>
              <Stack flex={2} gap={3}>
                <LinkAuthenticationElement
                  options={{
                    defaultValues: {
                      email: customer?.email ?? "",
                    },
                  }}
                />

                <AddressElement
                  onChange={handleAddressChange}
                  options={{
                    mode: "shipping",
                    fields: {
                      phone: "always",
                    },
                    defaultValues: {
                      name: customer.name,
                      address: customerAddress
                        ? { ...customerAddress, country: "US" }
                        : undefined,
                      phone: customer.phone,
                    },
                  }}
                />
              </Stack>
              <Box flex={1}>
                <PaymentElement />
              </Box>
            </>
          )}
        </Stack>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
