import React from "react";
import {OrdersApi} from "@/services/orders.service";
import {Params} from "@/app/types/params";
import {Box, Button, Container, Paper, Stack, Typography} from "@mui/material";
import CheckoutTable from "@/app/components/CheckoutTable";

async function fetchOrder(id: string) {
  const response = await OrdersApi.getOne(id, true);

  return response.data;
}

export default async function PaymentSuccess({params}: Params) {
  const {customer, deliveryAddress, availableWorks} = await fetchOrder(params.id);

  const renderAddress = `${deliveryAddress?.streetAddress}, ${deliveryAddress?.city} - ${deliveryAddress?.zipCode}`

   

  return (
    <Container sx={{
      textAlign: 'center'
    }}>
      <Typography variant="h1">Payment Success!</Typography>

      <Paper elevation={2} sx={{
        borderRadius: 2,
        overflow: 'hidden',
        maxWidth: 900,
        marginX: 'auto',
        marginY: 5,
      }}>
        <Stack
          direction="row"
          gap={4}
          bgcolor="lightgrey"
          padding={2}
          sx={{
            textAlign: 'left'
          }}
        >
          <Box
          >
            <Typography variant="body2" fontWeight={500}>Delivery to:</Typography>
            <Typography variant="body2" component="span">{customer?.name}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight={500}>Address:</Typography>
            <Typography variant="body2">{renderAddress}</Typography>
          </Box>
        </Stack>

        <CheckoutTable
          data={availableWorks}
        />
      </Paper>
      <Button variant="contained">Go to my orders</Button>
    </Container>
  )
}
