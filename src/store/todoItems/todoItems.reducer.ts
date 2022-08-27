import { AnyAction } from "redux";

import { Item } from "./todoItems.types";

import {
  setCartContents,
  setCartIsOpen,
} from "./todoItems.action";

export type CartState = {
  readonly cartIsOpen: boolean;
  readonly cartItems: Item[];
};

export const CART_INITIAL_STATE = {
  cartIsOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartIsOpen.match(action)) {
    return { ...state, cartIsOpen: action.payload };
  }
  if (setCartContents.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  return state;

  //   switch (action.type) {
  //     case CART_ACTION_TYPES.SET_CART_CONTENTS:
  //       return {
  //         ...state,
  //         cartItems: action.payload,
  //       };
  //     case CART_ACTION_TYPES.SET_CART_STATUS: {
  //       return {
  //         ...state,
  //         cartIsOpen: action.payload,
  //       };
  //     }
  //     default:
  //       return state;
  //   }
};
