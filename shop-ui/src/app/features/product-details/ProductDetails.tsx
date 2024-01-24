import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product.interface";
import { productsHttp } from "../../api/productsHttp";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  addShoppingCartItemAsyc,
  removeShoppingCartItemAsyc,
} from "../shopping-cart/shoppingCartSlice";

export default function ProductDetailsPage() {
  const { shoppingCart, status } = useAppSelector(
    (state) => state.shoppingCart
  );

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const item = shoppingCart?.items.find(
    (item) => item.productId === product?.id
  );

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    id &&
      productsHttp
        .getProductDetails(parseInt(id))
        .then((productDetails) => setProduct(productDetails))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      dispatch(
        addShoppingCartItemAsyc({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;

      dispatch(
        removeShoppingCartItemAsyc({
          productId: product!.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (loading) {
    return <LoadingComponent />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>

          <Grid item xs={6}>
            <LoadingButton
              loading={status.includes("pendingRemoveItem" + product!.id)}
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
