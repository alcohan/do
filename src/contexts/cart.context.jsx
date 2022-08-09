import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
    cartIsOpen: false,
    setCartIsOpen: () => null,
    // cartContents: null,
    // setCartContents: () => null,
});

export const CartProvider = ( { children } ) => {
    const [ cartIsOpen, setCartIsOpen ] = useState(false);
    // const [ cartContents, setCartContents ] = useState(null);
    
    // const toggleCart = () => {
    //     console.log('toggled cart');
    //     setCartIsOpen(!cartIsOpen);
    // }
    
    // useEffect( () => {
    //     setCartIsOpen(true);
    //     // toggleCart();
    // },[])
    
    const value = { cartIsOpen, setCartIsOpen };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};