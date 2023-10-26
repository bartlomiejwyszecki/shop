import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import "./App.css";
import { Product } from "../models/product.interface";

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
      <h1>Restore</h1>
      <Catalog products={products} addProduct={addProduct}></Catalog>
    </div>
  );
}

export default App;
