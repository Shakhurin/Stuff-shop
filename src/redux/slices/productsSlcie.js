import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myInitialState } from "../initialState";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { shuffle } from "../../utils/funcs";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const responce = await axios(`${BASE_URL}/products`);
    return responce.data;
  }
);


export const productsSlice = createSlice({
  name: "products",
  initialState: myInitialState.products,
  reducers:{
    filterByPrice: (state,action) => {
      state.filtered = state.list.filter((el) => el.price < action.payload)
    },
    getRelatedProducts: (state, action) => {
      const list = state.list.filter((el) => el.category.id === action.payload)
      state.related = shuffle(list)
    }
  },
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = true
    });
  },
});

export const {filterByPrice, getRelatedProducts} = productsSlice.actions
export const productsReducer = productsSlice.reducer