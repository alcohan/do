import { createContext, useReducer } from 'react';

import createAction from '../utils/reducer/reducer.utils';

const INITIAL_STATE = {
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
  cartQuantity: 0,
  cartSubtotal: 0
};

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_STATUS: 'SET_CART_STATUS',
}

const cartReducer = (state, action) => {
    console.log('Dispatched cartReducer. State is:');
    console.log(state);
    console.log('Action is: ');
    console.log( action );

    const { type, payload } = action;
    const { cartItems, cartQuantity, cartSubtotal } = state;

    switch (type) {
        case 'SET_CART_ITEMS': 
            return {
                ...state,
                ...payload,
            }
        case 'SET_CART_STATUS':
            return {
                ...state,
                cartIsOpen: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
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

export const CartContext = createContext({
    // cartIsOpen: false,
    // setCartIsOpen: () => {},
    // cartItems: [],
    // addItemToCart: () => {},
    // cartQuantity: 0
});

export const CartProvider = ( { children } ) => {
    // const [ cartIsOpen, setCartIsOpen ] = useState(false);
    // const [ cartItemsOld, setCartItems ] = useState(INITIAL_STATE);
    // const [ cartQuantity, setCartQuantity ] = useState(0);

    //converting functionality from state to reducers
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const { cartIsOpen, cartItems, cartQuantity, cartSubtotal } = state;

    // console.log('CartProvider is rendering... Reducer contains: ');
    // console.log(state);

    // const toggleCart = () => {
    //     setCartIsOpen(!cartIsOpen);
    // }

    const addItemToCart = ( productToAdd ) => {
        const newCartItems = addCartItem( cartItems, productToAdd );
        updateCartItemsReducer(newCartItems);
    }  
    const removeItemFromCart = ( productToRemove ) => {
        const newCartItems = removeCartItem( cartItems, productToRemove );
        updateCartItemsReducer(newCartItems);
    }
    const deleteItemFromCart = (productToDelete ) => {
        const newCartItems = deleteCartItem( cartItems, productToDelete );
        updateCartItemsReducer(newCartItems);
    }

    const updateCartItemsReducer = (newCartItems) => {
        const count = newCartItems.reduce( (previousValue, item) => previousValue+item.quantity, 0)
        const subtotal = newCartItems.reduce( (total, item) => total+item.price*item.quantity, 0)
        const payload = {
            cartItems: newCartItems,
            cartQuantity: count,
            cartSubtotal: subtotal
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }

    const toggleCart = () => {
        const newValue = !cartIsOpen
        dispatch( {type: CART_ACTION_TYPES.SET_CART_STATUS, payload: newValue})
    }
 
    const value = { 
        cartIsOpen, 
        toggleCart, 
        cartItems, 
        cartQuantity,
        cartSubtotal,
        addItemToCart, 
        removeItemFromCart, 
        deleteItemFromCart, 
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};