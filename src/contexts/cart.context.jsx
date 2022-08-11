import { createContext, useState, useEffect } from 'react';

const sampleCart =    [{
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
  }];

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
}

export const CartContext = createContext({
    cartIsOpen: false,
    setCartIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0
});

export const CartProvider = ( { children } ) => {
    const [ cartIsOpen, setCartIsOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState(sampleCart);
    const [ cartQuantity, setCartQuantity ] = useState(0);

    const addItemToCart = ( productToAdd ) => {
        setCartItems(addCartItem( cartItems, productToAdd ));
    }  

    const updateCartQuantity = () => {
        setCartQuantity(cartItems.reduce( (previousValue, item) => previousValue+item.quantity, 0))
    }

    //update quantity when cartItems changes
    useEffect( () => {
        updateCartQuantity();
    },[cartItems])
 
    const value = { cartIsOpen, setCartIsOpen, cartItems, addItemToCart, cartQuantity };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};