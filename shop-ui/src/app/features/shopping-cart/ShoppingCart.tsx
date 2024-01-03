import { useEffect, useState } from "react";
import { ShoppingCart } from "../../models/shopping-cart.interface";
import { shoppingCartHttp } from "../../api/httpClient";
import LoadingComponent from "../../layout/LoadingComponent";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function ShoppingCart() {
  const [isLoading, setIsLoading] = useState(true);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

  useEffect(() => {
    shoppingCartHttp
      .get()
      .then((shoppingCart) => setShoppingCart(shoppingCart))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  });

  if (isLoading) {
    return <LoadingComponent message="Loading basket..." />;
  }

  if (!shoppingCart) {
    return <Typography variant="h3">Your shopping cart is empty</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCart.items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">${(item.price  / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color="error">
                    <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
