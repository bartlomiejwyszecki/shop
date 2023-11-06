import { Button } from "@mui/material";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../models/product.interface";

export default function Catalog() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    fetch("http://localhost:5265/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
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
