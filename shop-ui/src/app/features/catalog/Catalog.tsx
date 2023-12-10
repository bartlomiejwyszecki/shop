import { Button } from "@mui/material";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../models/product.interface";
import { productsHttp } from "../../api/productsHttp";

export default function Catalog() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    productsHttp.getProductsList().then((products) => setProducts(products));
  }, []);

  function addProduct() {}

  return (
    <>
      <ProductList products={products} />

      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
}
