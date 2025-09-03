import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchingProducts, fetchProducts, fetchProductsError, loadAllProducts } from '../store/slices/productsSlice'
import { fetchCartItem, fetchingCartData, loadCartItem } from '../store/slices/cartSlice'
import { fetchData } from '../store/middleware/apiMiddleware'
export default function Header() {
  const dispatch = useDispatch()
  useEffect(()=>{
    // here we are using api middleware to get product through api
    // dispatch(fetchData(
    //   {
    //     url: 'products',
    //     onStart: fetchProducts.type,
    //     onSuccess: loadAllProducts.type,
    //     onError: fetchProductsError.type
    //   })
    // )
    // this one is using custom func middleware(soon we will make thunk)
    dispatch(fetchingProducts())
    // here we are using api middleware to do get cart item from api
    //  dispatch(fetchData(
    //   {
    //     url: 'carts',
    //     onStart: fetchCartItem.type,
    //     onSuccess: loadCartItem.type,
    //     //onError: fetchProductsError.type
    //   })
    // )

    dispatch(fetchingCartData())

// using  tradisonal fetch to get the data from api 

    // dispatch(fetchProducts())
    // fetch('https://fakestoreapi.com/products')
    // .then((res) => res.json())
    // .then((data)=>{
    //   dispatch(loadAllProducts(data))
    // }).catch(()=>{
    //   dispatch(fetchProductsError())
    // })
// tradisonal method to fetch cart item from data
    // dispatch(fetchCartItem())
    // fetch('https://fakestoreapi.com/carts')
    // .then((res) => res.json())
    // .then((data)=>{
    //   dispatch(loadCartItem(data.splice(1,1)))
    // }).catch(()=>{
    //   //dispatch(fetchProductsError())
    // })
  },[])
  const cartItems = useSelector((state)=> state.cartItems.list)
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
          {
            (cartItems.reduce(
              (accumulator, currentItem) => accumulator + currentItem.quantity,0))
          }</div>
        </Link>
      </div>
    </header>
  )
}