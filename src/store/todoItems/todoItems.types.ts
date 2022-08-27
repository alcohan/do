import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES  {
    SET_CART_STATUS = 'cart/SET_CART_STATUS',
    SET_CART_CONTENTS = 'cart/SET_CART_CONTENTS',
}

export type Item = CategoryItem & {
    quantity: number;
}