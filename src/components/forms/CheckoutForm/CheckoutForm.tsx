import React, {FormEvent, useContext, useEffect, useState} from "react";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {Alert, Box, Snackbar, Stack} from "@mui/material";

import {useGetCart, usePostOrder, useUpdateCart} from "@/app/hooks";
import {useRouter} from "next/navigation";
import {useUpdateCustomer} from "@/app/hooks/services/customer";
import {TCustomer} from "@/app/models/customer.models";
import {SnackbarContext} from "@/app/context/snackbarContext";

type CheckoutFormProps = {
  cart: string[];
  clientSecret: string;
  onDisabled: (disabled: boolean) => void;
  onLoad: (load: boolean) => void;
  customer?: TCustomer
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, customer, onDisabled, cart, onLoad}) => {
  const route = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const {openError} = useContext(SnackbarContext)

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {refetch} = useGetCart({enabled: false});

  const {mutateAsync: mutateUpdateCustomer} = useUpdateCustomer();

  const {
    mutate: updateCart,
    isPending: updateCartLoading
  } = useUpdateCart(
    {onSuccess: () => refetch()}
  )

  const {mutateAsync, isPending} = usePostOrder({
    onSuccess: async (res) => {

      setLoading(true);

      await stripe?.confirmPayment({
        elements: elements ?? undefined,
        clientSecret,
        redirect: 'if_required',
      });

      updateCart([])

      setLoading(false);

      route.push(`/payment-success/${res.data.orderId}`)
    },
    onError: (error) => {
      setOpen(true);
      setError(error.message);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    elements?.submit().then(async (data) => {
      const {value} = await elements?.getElement('address')?.getValue() ?? {};

      if (data.error) throw new Error('invalid field')

      if (!value) return;
      await mutateAsync({
        availableWorks: cart,
        customer: {
          name: value?.name,
          phoneNumber: value?.phone
        },
        deliveryAddress: {
          streetAddress: value?.address.line1,
          city: value?.address.city,
          zipCode: value?.address.postal_code
        }
      })

      await mutateUpdateCustomer({
        customerId: customer?.id,
        // @ts-ignore
        data: value
      })
    }).catch(() => {
      openError('Failed submit')
    }).finally(() => setLoading(false))
  };

  const handleAddressChange = async () => {
    const stripeElement = elements?.getElement('address');

    const elementValue = await stripeElement?.getValue();

    onDisabled(!elementValue);
  };

  useEffect(() => {
    onLoad(isPending || updateCartLoading || loading)
  }, [isPending, updateCartLoading, loading]);

  // @ts-ignore
  return (
    <Stack gap={2}>
      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{width: "100%"}}
        >
          {error}
        </Alert>
      </Snackbar>
      <form
        id="checkout-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Stack
          gap={6}
          direction="row"
          sx={{width: "70dvw"}}
          justifyContent="space-between"
        >
          {
            customer &&
              <>
                  <Stack flex={2} gap={3}>
                      <LinkAuthenticationElement
                          options={{
                            defaultValues: {
                              email: customer?.email ?? ''
                            }
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
                              // @ts-ignore
                              address: customer?.address,
                              phone: customer.phone,
                            }
                          }}
                      />

                  </Stack>
                  <Box flex={1}>
                      <PaymentElement/>
                  </Box>
              </>
          }
        </Stack>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
