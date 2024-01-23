import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../models/shopping-cart.interface";
import { shoppingCartHttp } from "../../api/httpClient";

export interface ShoppingCartState {
  shoppingCart: ShoppingCart | null;
  status: string;
}

const initialState: ShoppingCartState = {
  shoppingCart: null,
  status: "idle",
};

export const addShoppingCartItemAsyc = createAsyncThunk<
  ShoppingCart,
  { productId: number; quantity: number }
>("shoppingCart/addShoppingCartItemAsync", async ({ productId, quantity }) => {
  try {
    return await shoppingCartHttp.addItem(productId, quantity);
  } catch (error) {
    console.log(error);
  }
});

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.shoppingCart?.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      state.shoppingCart!.items[itemIndex].quantity -= quantity;

      if (state.shoppingCart!.items[itemIndex].quantity <= 0) {
        state.shoppingCart!.items.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addShoppingCartItemAsyc.pending, (state, action) => {
      console.log(action);
      state.status = "pending";
    });
    builder.addCase(addShoppingCartItemAsyc.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addShoppingCartItemAsyc.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setShoppingCart, removeItem } = shoppingCartSlice.actions;
