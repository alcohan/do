import createAction from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartIsOpen = (isOpen=false) => {
    return createAction(CART_ACTION_TYPES.SET_CART_STATUS,isOpen);
}


const addCartItem = ( cartItems, productToAdd ) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (item) => (item.id === productToAdd.id)
        );

    //if found, increment qty
    if (existingCartItem) {
        return cartItems.map( (cartItem) => cartItem.id === productToAdd.id ? 
            { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }

    //return new array with modified cartItems / new cart item
    return [...cartItems, {...productToAdd, quantity:1}];
};
const removeCartItem = ( cartItems, productToRemove ) => {
    return cartItems.map( (cartItem) => cartItem.id == productToRemove.id ?
        {...cartItem, quantity:cartItem.quantity-1}
        : cartItem
    );
}
const deleteCartItem = ( cartItems, productToDelete ) => {
    return cartItems.filter( (cartItem) => (cartItem.id !== productToDelete.id) )
};



export const addItemToCart = (cartItems, productToAdd ) => {
    const newCartItems = addCartItem( cartItems, productToAdd );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}  
export const removeItemFromCart = ( cartItems, productToRemove ) => {
    const newCartItems = removeCartItem( cartItems, productToRemove );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

}
export const deleteItemFromCart = ( cartItems, productToDelete ) => {
    const newCartItems = deleteCartItem( cartItems, productToDelete );
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

const updateCartItemsReducer = (newCartItems) => {
    const payload = {
        cartItems: newCartItems,
    }

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}