import { Button } from "@mui/material";
import ProductList from "./components/ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending")) return <LoadingComponent />;

  return (
    <>
      <ProductList products={products} />

      <Button variant="contained">Add product</Button>
    </>
  );
}
