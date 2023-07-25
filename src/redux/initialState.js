export const REDUX_STATE_LC = 'reduxStore'

export const myInitialState = {
  categories:{
    list:[],
    isLoading: true,
  },
  products: {
    list:[],
    filtered: [],
    related: [],
    isLoading: true,
  },
  singleProduct:{
    data: {},
    isLoading: true
  },
  searchProducts:{
    list: [],
    isLoading: true,
  },
  user:{
    currentUser:null,
    isLoading: true,
    cart: [],
    favourites: [],
    formType: 'signup',
    showForm: false,
  }
}

export const getInitialData = () => {
  const dataFromLC = localStorage.getItem(REDUX_STATE_LC)

  return dataFromLC ? JSON.parse(dataFromLC) : myInitialState
}