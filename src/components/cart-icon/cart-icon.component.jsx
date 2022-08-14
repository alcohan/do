import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {CartIconContainer} from './cart-icon.styles.jsx';

const CartIcon = ( ) => {
    const { cartQuantity, toggleCart } = useContext(CartContext);
   
    const onClickHandler = () => {
        if(window.location.pathname==='/checkout')
            return;
        toggleCart();
    }

    return (
        <CartIconContainer onClick={onClickHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>
                {cartQuantity}
            </span>
        </CartIconContainer>
    )
}

export default CartIcon;