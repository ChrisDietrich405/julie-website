import React from "react";
import {OrdersApi} from "@/services/orders.service";
import {Params} from "@/app/types/params";
import {Box, Container, List, ListItem, Stack, Typography} from "@mui/material";

async function fetchOrder(id: string) {
  const response = await OrdersApi.getOne(id, true);

  return response.data;
}

export default async function PaymentSuccess({params}: Params) {

  const { customer, deliveryAddress, availableWorks } = await fetchOrder(params.id);

  const renderAddress = `${deliveryAddress.streetAddress}, ${deliveryAddress.city} - ${deliveryAddress.zipCode}`

  return (
    <Container>
      <Typography variant="h1">Payment Success!</Typography>
      <Box>
        <Typography variant="h2">Customer details</Typography>
        <Typography variant="body2" component="span" fontWeight={500}>Nome: </Typography>
        <Typography variant="body2" component="span">{customer?.name}</Typography>

        <List>
          {
            availableWorks?.map(item =>
              <ListItem>
                <Stack direction="row" columnGap={2}>
                <img src={item.image} alt={item.title} height={100} width={100} />
                  <Typography variant="h3">{item.title}</Typography>
                </Stack>
              </ListItem>
            )
          }

        </List>
        <Typography variant="h2">Delivery address</Typography>
        <Typography variant="body2">{renderAddress}</Typography>
      </Box>
    </Container>
  )
}
