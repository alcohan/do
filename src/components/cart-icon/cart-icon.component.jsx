import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {CartIconContainer} from './cart-icon.styles.jsx';

const CartIcon = ( ) => {
    const { cartIsOpen, setCartIsOpen, cartQuantity } = useContext(CartContext);

    const toggleCart = () => {
        setCartIsOpen(!cartIsOpen);
    };
    
    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>
                {cartQuantity}
            </span>
        </CartIconContainer>
    )
}

export default CartIcon;