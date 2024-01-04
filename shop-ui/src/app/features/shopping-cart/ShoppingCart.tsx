import { ShoppingCart } from "../../models/shopping-cart.interface";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../context/StoreContext";
import { useState } from "react";
import { shoppingCartHttp } from "../../api/httpClient";
import { LoadingButton } from "@mui/lab";

export default function ShoppingCart() {
  const { shoppingCart, setShoppingCart, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    isLoading: false,
    name: "",
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({
      isLoading: true,
      name,
    });

    shoppingCartHttp
      .addItem(productId)
      .then((shoppingCart) => setShoppingCart(shoppingCart))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          isLoading: false,
          name: "",
        })
      );
  }

  function handleRemoveItem(productId: number, name: string, quantity = 1) {
    setStatus({
      isLoading: true,
      name,
    });

    shoppingCartHttp
      .removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          isLoading: false,
          name: "",
        })
      );
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
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingCart.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.pictureUrl}
                    alt={item.name}
                    style={{ height: 50, marginRight: 20 }}
                  />

                  {item.name}
                </Box>
              </TableCell>
              <TableCell align="right">
                ${(item.price / 100).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                <LoadingButton
                  color="error"
                  loading={
                    status.isLoading && status.name === "rem" + item.productId
                  }
                  onClick={() =>
                    handleRemoveItem(item.productId, "rem" + item.productId)
                  }
                >
                  <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                  color="error"
                  loading={
                    status.isLoading && status.name === "add" + item.productId
                  }
                  onClick={() =>
                    handleAddItem(item.productId, "add" + item.productId)
                  }
                >
                  <Add />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">
                {((item.price / 100) * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                <LoadingButton
                  color="error"
                  loading={
                    status.isLoading && status.name === "rem" + item.productId
                  }
                  onClick={() =>
                    handleRemoveItem(item.productId, "rem" + item.productId, item.quantity)
                  }
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
