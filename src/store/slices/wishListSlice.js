const WISHLIST_ADD_ITEMS = 'wishList/addItems'
const WISHLIST_REMOVE_ITEMS = 'wishList/removeItems'

export function addToWishLit(productId){
    return {
       type: WISHLIST_ADD_ITEMS, 
       payload: { productId }
    }
}
export function removeFromWishList(productId){
    return {
        type: WISHLIST_REMOVE_ITEMS, 
        payload: { productId } 
    }
}

export default function wishListReducer(state = [], action){
    switch(action.type){
        case WISHLIST_ADD_ITEMS: 
            return [...state,  action.payload]
        case WISHLIST_REMOVE_ITEMS: 
            return state.filter((item)=>{
                return item.productId!== action.payload.productId
            })
        default: return state
    }
}