import productsReducere from "./slices/productsSlice";
import wishListReducer from "./slices/wishListSlice";
import cartReducer from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./middleware/apiMiddleware";
import { func } from "./middleware/funcMiddleware";
export const store = configureStore({
  reducer: { 
    products: productsReducere,
    cartItems: cartReducer,
    wishList: wishListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
})


