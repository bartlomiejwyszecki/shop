import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../../models/product.interface";
import { Link } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { addShoppingCartItemAsyc } from "../../shopping-cart/shoppingCartSlice";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {status} = useAppSelector(state => state.shoppingCart);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name.toUpperCase()}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          loading={status.includes('pending' + product.id)}
          onClick={() => dispatch(addShoppingCartItemAsyc({productId: product.id }))}
        >
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
