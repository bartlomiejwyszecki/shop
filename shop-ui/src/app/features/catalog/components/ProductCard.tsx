import { ListItemAvatar, Avatar, ListItemText, ListItem } from "@mui/material";
import { Product } from "../../../models/product.interface";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={product.pictureUrl}></Avatar>
      </ListItemAvatar>
      <ListItemText>
        {product.name} - {product.price}
      </ListItemText>
    </ListItem>
  );
}
