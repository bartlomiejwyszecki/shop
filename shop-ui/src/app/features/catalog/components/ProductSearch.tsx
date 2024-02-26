import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { setProductParams } from "../catalogSlice";
import { useMemo, useState } from "react";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const fetchProducts = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }));
      }, 1000),
    [dispatch]
  );

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        fetchProducts(event);
      }}
    />
  );
}
