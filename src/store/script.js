
import { combineReducers, createStore } from "redux";
import productsReducere from "./slices/productsSlice";
import wishListReducer from "./slices/wishListSlice";
import cartReducer from "./slices/cartSlice";
const reducer = combineReducers({
  products: productsReducere,
  cartItems: cartReducer,
  wishList: wishListReducer
})

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
);

