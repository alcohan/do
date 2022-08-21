import { CART_ACTION_TYPES, Item } from "./cart.types";

import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type SetCartIsOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_STATUS,
  boolean
>;

export type SetCartContents = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_CONTENTS,
  Item[]
>;

export const setCartIsOpen = withMatcher((isOpen = false):SetCartIsOpen => {
  return createAction(CART_ACTION_TYPES.SET_CART_STATUS, isOpen);
});

export const setCartContents = withMatcher(
(newCartItems:Item[]) => {
    return createAction(CART_ACTION_TYPES.SET_CART_CONTENTS, newCartItems);
});

const addCartItem = (cartItems: Item[]=[], productToAdd: Item): Item[] => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  //if found, increment qty
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems: Item[]=[], productToRemove: Item): Item[] => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const deleteCartItem = (cartItems: Item[]=[], productToDelete: Item): Item[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const addItemToCart = withMatcher((cartItems: Item[], productToAdd: Item): SetCartContents => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartContents(newCartItems);
});

export const removeItemFromCart = withMatcher((
  cartItems: Item[],
  productToRemove: Item
): SetCartContents => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartContents(newCartItems);
});

export const deleteItemFromCart = withMatcher((
  cartItems: Item[],
  productToDelete: Item
): SetCartContents => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartContents(newCartItems);
});
