import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartListing from './RenderCartListing'
import RenderTotalAmount from './RenderTotalAmount'


const Cart = () => {

    const {total, totalItems} = useSelector((state) => state.cart)
  return (
    <div className='text-white'>
      <h1>Cart</h1>
      <p>{totalItems} Listing in Cart</p>

      {
        total>0 ? (
            <div>
                <RenderCartListing />
                <RenderTotalAmount></RenderTotalAmount>
            </div>
        ):(<div>
            <p>Cart is Empty</p>
            </div>)
      }
    </div>
  )
}

export default Cart
