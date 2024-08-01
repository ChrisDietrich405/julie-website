"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await axios.get(`http://localhost:3000/api/orders`);
      setData(response.data);
    };
    getAllOrders();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Customer&nbsp;</TableCell>
            <TableCell align="right">OrderCode</TableCell>
            <TableCell align="right">Status&nbsp;</TableCell>
            <TableCell align="right">Art&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.status}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="right">{row.customer.name}</TableCell>
              <TableCell align="right">{row.orderCode}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                {row.availableWorks.map((art) => {
                  return <p>{art}</p>;
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
