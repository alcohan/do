import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    cartIsOpen: false,
    cartItems: [],
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