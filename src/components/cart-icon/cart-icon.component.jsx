import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { CartContext } from '../../contexts/cart.context';
import { selectCartQuantity, selectCartIsOpen } from '../../store/cart/cart.selector';
import { setCartIsOpen } from '../../store/cart/cart.action';

import {CartIconContainer} from './cart-icon.styles.jsx';

const CartIcon = ( ) => {
    // const { cartQuantity, toggleCart } = useContext(CartContext);
    const qty = useSelector(selectCartQuantity);
    const cartIsOpen = useSelector(selectCartIsOpen);
    const dispatch = useDispatch();
   
    const onClickHandler = () => {
        if(window.location.pathname==='/checkout')
            return;
        dispatch(setCartIsOpen(!cartIsOpen));
    }

    return (
        <CartIconContainer onClick={onClickHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>
                {qty}
            </span>
        </CartIconContainer>
    )
}

export default CartIcon;