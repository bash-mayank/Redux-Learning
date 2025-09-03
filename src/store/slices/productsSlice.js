import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchingProducts = createAsyncThunk('product/productsItems',async()=>{
  try{
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    return data
  }
  catch(err){
    throw err
  }
})
const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: ''
  },
  extraReducers:
  (builder)=>{
    builder.addCase(fetchingProducts.pending, (state) =>{
      state.loading = true
    }).addCase(fetchingProducts.fulfilled, (state, action)=>{
      state.loading = false
      state.list = action.payload;
      state.error= ''
    }).addCase(fetchingProducts.rejected, (state, action)=>{
      state.loading = false
      state.error = action.payload || 'Something went wrong...'
    })
  }
  
})

// Thunk action creator manual

// export const fetchingPrducts = ()=>{
//   return (dispatch)=>{
//     dispatch(fetchProducts())
//     fetch('https://fakestoreapi.com/products')
//     .then((res) => res.json())
//     .then((data)=>{
//       dispatch(loadAllProducts(data))
//     })
//     .catch(()=>{
//       dispatch(fetchProductsError())
//     })
//   }
// }






export const getAllProducts = (state) => state.products.list
export const getProductLoadingState = (state) => state.products.loading
export const getProductErrorState = (state) => state.products.error
export const { loadAllProducts, fetchProducts, fetchProductsError } = slice.actions;  // actions come from slice.actions
export default slice.reducer;                      // reducer comes from slice.reducer
