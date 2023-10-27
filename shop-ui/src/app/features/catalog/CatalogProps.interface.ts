import { Product } from "../../models/product.interface.ts";

export interface CatalogProps {
  products: Product[];
  addProduct: () => void;
}
