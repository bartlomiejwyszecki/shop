import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { getPriceDisplayValue } from "../../utils/get-price-display-value";
import { useAppSelector } from "../../store/configureStore";

export default function ShoppingCartSummary() {
  const { shoppingCart } = useAppSelector(state => state.shoppingCart);

  const subtotal = shoppingCart?.items.reduce(
    (sum, item) => sum + (item.quantity * (item.price / 100)),
    0
  ) ?? 0;

  const deliveryFee = 20;

  const total = subtotal + deliveryFee;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">
                {getPriceDisplayValue(subtotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">
                {getPriceDisplayValue(deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{getPriceDisplayValue(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
