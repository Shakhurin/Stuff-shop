import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myInitialState } from "../initialState";
import { buildUrl } from "../../utils/funcs";
import axios from "axios";
import {BASE_URL} from '../../utils/constants'

export const getProductsWithParams = createAsyncThunk('products/getProductsWithParams', async (params) => {
  const responce = await axios(`${buildUrl(`${BASE_URL}/products/`,params)}`)
  return responce.data
})


const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState: myInitialState.searchProducts,
  extraReducers: builder => {
    builder.addCase(getProductsWithParams.fulfilled, (state, action) => {
      state.list = action.payload
      state.isLoading = false
    });
    builder.addCase(getProductsWithParams.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getProductsWithParams.rejected, (state) => {
      state.isLoading = true
    });
  }
})

export const searchProductsReducer = searchProductsSlice.reducer