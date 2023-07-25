import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./slices/categorySlice";
import { productsReducer } from "./slices/productsSlcie";
import { singleProductReducer } from "./slices/singleProductSlice";
import { userReducer } from "./slices/userSlice";
import { searchProductsReducer } from "./slices/searchProductsSlice";
import { REDUX_STATE_LC, getInitialData } from "./initialState";

export const store = configureStore({
  reducer:{
    categories: categoriesReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
    user: userReducer,
    searchProducts: searchProductsReducer,
  },
  preloadedState: getInitialData()
})

store.subscribe(() => {
  localStorage.setItem(REDUX_STATE_LC, JSON.stringify(store.getState()))
})