import { Grid } from "@mui/material";
import { Product } from "../../../models/product.interface";
import { ProductCard } from "./ProductCard";
import { useAppSelector } from "../../../store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} lg={4}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard key={product.id} product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
