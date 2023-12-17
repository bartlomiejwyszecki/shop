import { Button } from "@mui/material";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { Product } from "../../models/product.interface";
import { productsHttp } from "../../api/productsHttp";
import LoadingComponent from "../../layout/LoadingComponent";

export default function Catalog() {
  const [products, setProducts] = useState([] as Product[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsHttp
      .getProductsList()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <ProductList products={products} />

      <Button variant="contained">Add product</Button>
    </>
  );
}
