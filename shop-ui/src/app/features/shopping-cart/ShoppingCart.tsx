import { ShoppingCart } from "../../models/shopping-cart.interface";
import {
  Box,
  Button,
  Grid,
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
import { useState } from "react";
import { shoppingCartHttp } from "../../api/httpClient";
import { LoadingButton } from "@mui/lab";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { getPriceDisplayValue } from "../../utils/get-price-display-value";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { removeItem, setShoppingCart } from "./shoppingCartSlice";

export default function ShoppingCart() {
  // const { shoppingCart, setShoppingCart, removeItem } = useStoreContext();
  const { shoppingCart } = useAppSelector(state => state.shoppingCart);

  const dispatch = useAppDispatch();

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
      .then((shoppingCart) => dispatch(setShoppingCart(shoppingCart)))
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
      .then(() => dispatch(removeItem({ productId, quantity })))
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
    <>
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
                  {getPriceDisplayValue((item.price / 100).toFixed(2))}
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
                  {getPriceDisplayValue((item.price / 100) * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={
                      status.isLoading && status.name === "rem" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        "rem" + item.productId,
                        item.quantity
                      )
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
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <ShoppingCartSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
