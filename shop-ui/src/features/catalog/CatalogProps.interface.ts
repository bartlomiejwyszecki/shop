import { Product } from "../../app/models/product.interface.ts";

export interface CatalogProps {
  products: Product[];
  addProduct: () => void;
}
