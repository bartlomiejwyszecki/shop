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
import { useState } from "react";
import { shoppingCartHttp } from "../../../api/httpClient";

import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../../context/StoreContext";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {setShoppingCart} = useStoreContext();

  function handleAddItem(productId: number) {
    setIsLoading(true);

    shoppingCartHttp
      .addItem(productId)
      .then(shoppingCart => setShoppingCart(shoppingCart))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }
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
          loading={isLoading}
          onClick={() => handleAddItem(product.id)}
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
