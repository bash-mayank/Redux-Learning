import React from 'react'
import { useSelector } from 'react-redux'
import { getProductErrorState, getProductLoadingState, getAllProducts } from '../store/slices/productsSlice.js'
import Product from '../components/product.jsx'
export default function Home() {
  const productsList = useSelector(getAllProducts)
  const isLoading = useSelector(getProductLoadingState)
  const error = useSelector(getProductErrorState) 
  return isLoading ? (<h1>laoding.....</h1>) 
  :(
    error ? <h1>{error}</h1>:
    (
      <div className="products-container">
        {productsList.map(({ id, title, rating, price, image }) => (
          <Product
            key={id}
            productId = {id}
            title={title}
            rating={rating.rate}
            price={price}
            image={image}
          />
        ))}
      </div>
    )
  )
}