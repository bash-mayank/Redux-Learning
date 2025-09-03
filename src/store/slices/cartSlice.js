import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { fetchData } from "../middleware/apiMiddleware"

const findItemIndex = (state, action) =>
state.findIndex((cartItem) => cartItem.productId === action.payload.productId)
export const fetchingCartData = createAsyncThunk('cart/fetchCartItems',async()=>{
  try{
    const response = await fetch('https://fakestoreapi.com/carts')
    
    return response.json()
  }
  catch(err){
    throw err
  }
})
const slice = createSlice({
  name: "cart",
  initialState:{
    loading: false,
    list: [],
    error: ''
  },
  reducers: {
    // fetchCartItem(state){
    //   state.loading = true
    // },
    // loadCartItem(state, action){
    //   const temp = action.payload[0]
    //   state.list =  temp.products
    //   state.loading = false
    // },
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1
      } else {
        state.list.push({ ...action.payload, quantity: 1 })
      }
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      if (existingItemIndex !== -1) {
        state.list.splice(existingItemIndex, 1)
      }
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1
      }
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity -= 1
        if (state.list[existingItemIndex].quantity === 0) {
          state.list.splice(existingItemIndex, 1)
        }
      }
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchingCartData.pending, (state) =>{
      state.loading = true
    }).addCase(fetchingCartData.fulfilled, (state, action)=>{
      const temp = action.payload[0]
      state.list =  temp.products
      state.loading = false
    })
  }
})

export const getCartLoadingState = state => state.cartItems.loading
export const getAllCartItems= createSelector(
  [(state) => state.products.list, (state) => state.cartItems.list],
  (products, cartItems) =>
    cartItems
      .map(({ productId, quantity }) => {
        const cartProduct = products.find((p) => p.id === productId)
        return cartProduct ? { ...cartProduct, quantity } : null
      })
      .filter((({title})=>title))
)

// export const fetchingCartData = ()=>{
//   return (dispatch)=>{
//     dispatch(fetchCartItem())
//     fetch('https://fakestoreapi.com/carts')
//     .then((res) => res.json())
//     .then((data)=>{
//       dispatch(loadCartItem(data.splice(1,1)))
//     })
//     .catch(()=>{
//       // dispatch(fetchProductsError())
//     })
//   }
//}

export const {
  fetchCartItem,
  loadCartItem,
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} = slice.actions

export default slice.reducer
