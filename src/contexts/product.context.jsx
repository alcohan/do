import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
    Product: null,
    setProduct: () => null,
});

export const ProductProvider = ( { children } ) => {
    const [ Product, setProduct ] = useState(null);
    const value = { Product, setProduct }

    useEffect( () => {
        setProduct(PRODUCTS);
    },[])

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};