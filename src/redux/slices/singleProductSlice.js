import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myInitialState } from "../initialState";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getSingleProduct = createAsyncThunk('singleProduct/getSingleProduct', async (id) => {
  const responce = await axios(`${BASE_URL}/products/${id}`)
  return responce.data
})

const singleProductSlice = createSlice({
  name: 'singleProduct',
  reducers:{  },
  initialState: myInitialState.singleProduct,
  extraReducers: builder => {
    builder
      .addCase(getSingleProduct.fulfilled, (state,action) => {
        state.data = action.payload
        state.isLoading = false 
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSingleProduct.rejected, (state) => {
        state.isLoading = true
      })
  }
})

export const singleProductReducer = singleProductSlice.reducer 