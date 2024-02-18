import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ProductList from "./components/ProductList";
import { useEffect } from "react";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "./catalogSlice";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price descending" },
  { value: "priceAsc", label: "Price ascending" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilters());
    }
  }, [filtersLoaded, dispatch]);

  if (status.includes("pending")) return <LoadingComponent />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <TextField label="Search products" variant="outlined" fullWidth />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {sortOptions.map((opt) => (
                <FormControlLabel
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                  key={opt.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                control={<Checkbox />}
                label={brand}
                key={brand}
              />
            ))}
          </FormGroup>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => (
              <FormControlLabel
                control={<Checkbox />}
                label={type}
                key={type}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination
            color="secondary"
            size="large"
            count={10}
            page={2}
          ></Pagination>
        </Box>
      </Grid>
    </Grid>
  );
}
