import { useEffect, useState } from "react";
import Catalog from "../features/catalog/Catalog";
import "./App.css";
import { Product } from "../models/product.interface";
import { Container, CssBaseline, Typography } from "@mui/material";
import Header from "./Header";

function App() {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    fetch("http://localhost:5265/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {}

  return (
    <>
      <CssBaseline />
      
      <Header />

      <Container>
        <Catalog products={products} addProduct={addProduct}></Catalog>
      </Container>
    </>
  );
}

export default App;
