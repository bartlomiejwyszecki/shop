import { useEffect, useState } from "react";
import { ShoppingCart } from "../../models/shopping-cart.interface";
import { shoppingCartHttp } from "../../api/httpClient";
import LoadingComponent from "../../layout/LoadingComponent";
import { Typography } from "@mui/material";

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

  return <h1>Custome id = {shoppingCart.customerId}</h1>;
}
