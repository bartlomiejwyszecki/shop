import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { shoppingCartSlice } from "../features/shopping-cart/shoppingCartSlice";
import { catalogSlice } from "../features/catalog/catalogSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
