import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
  Typography
} from '@mui/material';
import {CheckoutTableProps} from "./CheckoutTable.types";
import {RemoveShoppingCart} from "@mui/icons-material";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import {currencyFormat} from "@/helpers";

const CheckoutTable: React.FC<CheckoutTableProps & TableProps> = (
  {
    data,
    hideHeader,
    loading,
    onRemove,
    ...tableProps
  }
) => {

  const amount = data.reduce((total, item) => total + item.price, 0)

  return (<TableContainer component={Paper}>
      <Table {...tableProps}>
        {
          !hideHeader &&
            <TableHead sx={{
              backgroundColor: 'primary.dark',

              '& th': {
                color: '#eeeeee',
              }
            }}>
                <TableRow>
                    <TableCell>IMAGE</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>MEASUREMENTS</TableCell>
                    <TableCell>PRICE</TableCell>
                  {
                    onRemove &&
                      <TableCell>ACTIONS</TableCell>
                  }
                </TableRow>
            </TableHead>
        }
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} sx={{
              '&:nth-of-type(odd)': {
                backgroundColor: 'grey.200',
              },
            }}>
              <TableCell>
                <img src={item.image} alt={item.title} style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
              </TableCell>
              <TableCell>
                <Link href={`/available-works/${item._id}`}>
                  {item.title}
                </Link>
              </TableCell>
              <TableCell>{item.measurements}</TableCell>
              <TableCell>{currencyFormat(item.price)}</TableCell>
              {
                onRemove &&
                  <TableCell>
                      <LoadingButton
                          loading={loading}
                          variant="contained"
                          color="error"
                          startIcon={<RemoveShoppingCart/>}
                          onClick={() => onRemove(item._id)}
                      >
                          Remove
                      </LoadingButton>
                  </TableCell>
              }
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} sx={{
              textAlign: 'right',
            }}>
              <Typography fontWeight={500}>
                Total
              </Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight={500}>
                {currencyFormat(amount)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CheckoutTable;