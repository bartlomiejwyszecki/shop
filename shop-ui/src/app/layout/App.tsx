import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import "./App.css";
import { Product } from "../models/product.interface";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    fetch("http://localhost:5265/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {}

  return (
    <div>
      <Typography variant="h1">Re-Store</Typography>
      <Catalog products={products} addProduct={addProduct}></Catalog>
    </div>
  );
}

export default App;
