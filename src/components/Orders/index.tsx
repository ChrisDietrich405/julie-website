import * as React from "react";
import { BaseApi } from "@/services/base.service";

const getData = async () => {
  return await BaseApi.get("/orders");
};

export default async function DataGridDemo() {
  const data = await getData();

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
