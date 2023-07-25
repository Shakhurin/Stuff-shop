import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myInitialState } from "../initialState";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk('user/createUser', async (payload) =>{
  const responce = await axios.post(`${BASE_URL}/users`, payload)
  return responce.data
})
export const loginUser = createAsyncThunk('user/loginUser', async (payload) =>{
  const responce = await axios.post(`${BASE_URL}/auth/login`, payload)
  const login = await axios(`${BASE_URL}/auth/profile`, {
    headers:{
      "Authorization": `Bearer ${responce.data.access_token}`
    }
  })
  return login.data
})
export const updateUser = createAsyncThunk('user/updateUser', async (payload) =>{
  const responce = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
  return responce.data
})


const userSlice = createSlice({
  name: 'user',
  initialState: myInitialState.user,
  reducers:{
    addItemToCart: (state, action) =>{
      let newCart = [...state.cart];
      const found = state.cart.find((el) => el.id === action.payload.id)

      if(found) {
        newCart = newCart.map((item) => {
          return item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity || item.quantity + 1}
            : item
        })
      } else{
        newCart.push({...action.payload, quantity: 1})
      }

      state.cart = newCart
    },
    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter((item)=> item.id !== action.payload.id)
    },
    addItemToFavourites: (state, action) => {
      let newFav = [...state.favourites];
      const found = state.favourites.find((el) => el.id === action.payload.id)

      if(!found) {
        newFav.push(action.payload)
      }
      else{
        newFav = newFav.filter((item) => item.id !== action.payload.id)
      }

      state.favourites = newFav
    },
    setStateDefault: (state) => {
      state.cart = myInitialState.user.cart
    },
    toggleForm: (state, action) => {
      state.showForm = action.payload
    },
    toggleFormType: (state, action) => {
      state.formType = action.payload
    },
  },
  extraReducers: bulder => {
    bulder
      .addCase(createUser.fulfilled, (state,action) => {
        state.currentUser = action.payload
        state.isLoading = false
      })
      .addCase(loginUser.fulfilled, (state,action) => {
        state.currentUser = action.payload
        state.isLoading = false
      })
      .addCase(updateUser.fulfilled, (state,action) => {
        state.currentUser = action.payload
        state.isLoading = false
      })
  }
})

export const {addItemToCart, setStateDefault, toggleForm,toggleFormType, removeItemFromCart, addItemToFavourites} = userSlice.actions
export const userReducer = userSlice.reducer