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
  { productId: number; quantity?: number }
>(
  "shoppingCart/addShoppingCartItemAsync",
  async ({ productId, quantity = 1 }) => {
    try {
      return await shoppingCartHttp.addItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeShoppingCartItemAsyc = createAsyncThunk<
  void,
  { productId: number; quantity: number, name?: string }
>(
  "shoppingCart/removeShoppingCartItemAsync",
  async ({ productId, quantity }) => {
    try {
      await shoppingCartHttp.removeItem(productId, quantity);
    } catch (error) {
      console.log(error);
    }
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addShoppingCartItemAsyc.pending, (state, action) => {
      state.status = "pending" + action.meta.arg.productId;
    });
    builder.addCase(addShoppingCartItemAsyc.fulfilled, (state, action) => {
      state.shoppingCart = action.payload;
      state.status = "idle";
    });
    builder.addCase(addShoppingCartItemAsyc.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(removeShoppingCartItemAsyc.pending, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeShoppingCartItemAsyc.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;

      const itemIndex = state.shoppingCart?.items.findIndex(
        (i) => i.productId === productId
      );

      if (itemIndex === -1 || itemIndex === undefined) return;

      state.shoppingCart!.items[itemIndex].quantity -= quantity;

      if (state.shoppingCart!.items[itemIndex].quantity <= 0) {
        state.shoppingCart!.items.splice(itemIndex, 1);
      }

      state.status = "idle";
    });
    builder.addCase(removeShoppingCartItemAsyc.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setShoppingCart } = shoppingCartSlice.actions;
