import React from 'react'
import { useSelector } from 'react-redux'
import Product from '../components/product.jsx'

export default function Home() {
  const productsList = useSelector((state) => state.products)

  return (
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
}