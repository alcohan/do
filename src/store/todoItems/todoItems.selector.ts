import { createSelector } from 'reselect';
import { Item } from './todoItems.types';

import { RootState } from '../store';
import { CartState } from './todoItems.reducer';

const selectCartReducer = (state: RootState): CartState => state.cart;
export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.cartIsOpen
);

// export const selectCartIsOpen = (state) => state.cart.cartIsOpen;

// export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartQuantity = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (previousValue:number, item:Item) => previousValue+item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (total:number, item:Item) => total+item.price*item.quantity, 0)
);