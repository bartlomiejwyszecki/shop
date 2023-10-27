import { Button } from "@mui/material";
import { CatalogProps } from "./CatalogProps.interface";
import ProductList from "./components/ProductList";

export default function Catalog({ products, addProduct }: CatalogProps) {
  return (
    <>
      <ProductList products={products} />

      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
}
