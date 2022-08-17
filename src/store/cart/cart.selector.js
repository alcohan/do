import { createSelector } from 'reselect';

const selectCartReducer = state => state.cart;
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
    (cartItems) => cartItems.reduce( (previousValue, item) => previousValue+item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce( (total, item) => total+item.price*item.quantity, 0)
);