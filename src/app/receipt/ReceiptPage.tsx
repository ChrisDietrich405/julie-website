"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import { useGetAllOrders } from "../hooks";
import { OrderData } from "@/interfaces";
import {useMemo} from "react";
import Typography from "@mui/material/Typography";
import {formatPhoneNumber} from "@/helpers";
import {Stack} from "@mui/material";

export default function ReceiptPage() {

  const { data } = useGetAllOrders();

  const columns: GridColDef<OrderData>[] = useMemo(() => ([
    {
      field: 'orderCode',
      headerName: 'Code',
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2" >{colDef.headerName}</Typography>,
    },
    {
      field: 'status',
      headerName: 'Payment Status',
      width: 150,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
    },
    {
      field: 'customer.name',
      headerName: 'Customer name',
      width: 200,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
      valueGetter: (_, row) => row.customer.name,
    },
    {
      field: 'customer.email',
      headerName: 'Customer E-mail',
      width: 200,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
      valueGetter: (_, row) => row.customer.email,
    },
    {
      field: 'customer.phoneNumber',
      headerName: 'Customer Phone',
      width: 200,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
      valueGetter: (_, row) => formatPhoneNumber(row.customer.phoneNumber.toString()),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
    },
    {
      field: 'deliveryAddress',
      headerName: 'Delivery Address',
      width: 400,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
      valueGetter: (_, {deliveryAddress}) =>
        `${deliveryAddress.streetAddress}, ${deliveryAddress.city} - ${deliveryAddress.zipCode}`,
    },
    {
      field: 'availableWorks',
      headerName: 'Works Sold',
      flex: 1,
      renderHeader: ({colDef}) => <Typography fontWeight={500} variant="body2">{colDef.headerName}</Typography>,
      renderCell: ({ row }) => (
        <Stack
          direction="row"
          height="100%"
          columnGap={2}
          alignItems="center"
        >
          {row.availableWorks.map((item, index) => (
            <img
              key={`${row.orderId}-${item.title}-${index}`}
              src={item.image}
              title={item.title}
              alt={`Thumbnail of ${item.title}`}
              style={{
                height: '90%',
                objectFit: 'cover',
                width: 'fit-content'
              }}
            />
            )
          )}
        </Stack>),
    },
  ]),[]);

  return (
    <Box paddingTop={6}>
      <Box
        width="90%"
        marginX="auto"
        marginTop={3}
        boxShadow="rgba(0,0,0,0.1) 1px 1px 3px"
        borderRadius={2}
        overflow="hidden"
      >
        <Box
          sx={{
          height: 60,
          width: "100%",
          backgroundColor: 'primary.dark'
        }}>
      <Typography
        variant="h1"
        color="white"
        lineHeight="60px"
        sx={{
          width: '100%'
        }}
      >
        All orders
      </Typography>

        </Box>

      <DataGrid
        disableRowSelectionOnClick
        getRowId={(row) => row.orderCode}
        slots={{ toolbar: GridToolbar }}
        rows={data?? []}
        columns={columns}

        sx={{
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#ffffff',
          },
        }}
      />
      </Box>
    </Box>
  );
}

