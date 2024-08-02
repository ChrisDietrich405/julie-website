import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { BaseApi } from "@/services/base.service";
import { dataTagSymbol } from "@tanstack/react-query";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "customer", headerName: "Customer Name" },
  {
    field: "deliveryAddress",
    headerName: "Delivery Address",
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    editable: true,
  },
  {
    field: "orderCode",
    headerName: "Order Code",
    type: "number",
    editable: true,
  },
  {
    field: "payment",
    headerName: "Payment",
  },
  {
    field: "availableWorks",
    headerName: "Available Works",
  },
];

const getData = async () => {
  const data = await BaseApi.get("/orders");
  console.log("DATA", data);
  return data;
};

export default async function DataGridDemo() {
  const data = await getData();
  console.log(data);
  return (
    <h1>hello</h1>

    // <Box sx={{ height: 400, width: "100%" }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     initialState={{
    //       pagination: {
    //         paginationModel: {
    //           pageSize: 5,
    //         },
    //       },
    //     }}
    //     pageSizeOptions={[5]}
    //     checkboxSelection
    //     disableRowSelectionOnClick
    //   />
    // </Box>
  );
}
