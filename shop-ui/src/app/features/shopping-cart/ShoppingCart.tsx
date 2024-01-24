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
import { LoadingButton } from "@mui/lab";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { getPriceDisplayValue } from "../../utils/get-price-display-value";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  addShoppingCartItemAsyc,
  removeShoppingCartItemAsyc,
} from "./shoppingCartSlice";

export default function ShoppingCart() {
  const { shoppingCart, status } = useAppSelector(
    (state) => state.shoppingCart
  );

  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    dispatch(addShoppingCartItemAsyc({ productId }));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    dispatch(removeShoppingCartItemAsyc({ productId, quantity }));
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
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId
                    )}
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={status.includes("pending" + item.productId)}
                    onClick={() => handleAddItem(item.productId)}
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
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId
                    )}
                    onClick={() =>
                      handleRemoveItem(item.productId, item.quantity)
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
