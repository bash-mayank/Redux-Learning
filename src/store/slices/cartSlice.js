import { produce } from "immer"

const CART_ADD_ITEMS = 'cart/addItems'
const CART_REMOVE_ITEMS = 'cart/removeItems'
const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseItemQuantity'
const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseItemQuantity'

export function addCartItem(productData) {
  return { type: CART_ADD_ITEMS, payload: productData }
}

export function removeCartItem(productId) {
  return { type: CART_REMOVE_ITEMS, payload: { productId } }
}

export function decreaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_DECREASE_QUANTITY,
    payload: { productId },
  }
}

export function increaseCartItemQuantity(productId) {
  return {
    type: CART_ITEM_INCREASE_QUANTITY,
    payload: { productId },
  }
}

// Reducer
export default function cartReducer(orignalState = [], action) {
 return produce(orignalState, (state)=>{
    const existingItemIndex = state.findIndex(
      (cartItem) => cartItem.productId === action.payload.productId
    )
    switch (action.type) {
      case CART_ADD_ITEMS:
        if (existingItemIndex !== -1) {
          state[existingItemIndex].quantity += 1
          return state
        }
        state.push({ ...action.payload, quantity: 1 })
        return state
      case CART_REMOVE_ITEMS:
        state.splice(existingItemIndex, 1)
        return state
      case CART_ITEM_INCREASE_QUANTITY:
        state[existingItemIndex].quantity += 1
        return state
      case CART_ITEM_DECREASE_QUANTITY:
        state[existingItemIndex].quantity -= 1
        if(state[existingItemIndex].quantity === 0){
          state.splice(existingItemIndex, 1)
        }
        return state
      default:
        return state
    }
  })
}