import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    cartIsOpen: false,
    cartItems: [
    {
    "id": 1,
    "name": "Brown Brim",
    "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    "price": 25,
    "quantity": 4
  },
  {
    "id": 2,
    "name": "Blue Beanie",
    "imageUrl": "https://i.ibb.co/ypkgK0X/blue-beanie.png",
    "price": 18,
    "quantity": 2
  },
  {
    "id": 3,
    "name": "Brown Cowboy",
    "imageUrl": "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
    "price": 35,
    "quantity": 1
  }],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    // console.log('Dispatched REDUX cartReducer. State is:');
    // console.log(state);
    // console.log('Action is: ');
    // console.log( action );

    const { type, payload } = action;
    const { cartItems, cartQuantity, cartSubtotal } = state;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_CONTENTS: 
            return {
                ...state,
                cartItems: payload,
            }
        case CART_ACTION_TYPES.SET_CART_STATUS:{
            return {
                ...state,
                cartIsOpen: payload,
            }}
        default:
            return state;
    }
}