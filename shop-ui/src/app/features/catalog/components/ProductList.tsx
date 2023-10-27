import { List, ListItem } from "@mui/material";
import { Product } from "../../../models/product.interface";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <List>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </List>
  );
}
