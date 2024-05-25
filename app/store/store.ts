import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Cart, ProductInCart } from "@/api/types";

export interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: {
    cartId: null,
    products: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string | null>) => {
      state.cart.cartId = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setCartProducts: (state, action: PayloadAction<ProductInCart[]>) => {
      state.cart.products = action.payload;
    },
  },
});

export const createStore = () =>
  configureStore({
    reducer: {
      cart: cartSlice.reducer,
    },
  });

export const { setCart, setCartId, setCartProducts } = cartSlice.actions;

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];

export const useCart = () => useSelector((state: RootState) => state.cart.cart);
