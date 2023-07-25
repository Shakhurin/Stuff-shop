import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myInitialState } from "../initialState";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await axios(`${BASE_URL}/categories`);
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: myInitialState.categories,
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false
    });
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = true
    })
  },
});

export const categoriesReducer = categoriesSlice.reducer;
