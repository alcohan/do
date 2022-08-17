import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
// import { CartContext } from '../../contexts/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setCartIsOpen } from '../../store/cart/cart.action';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const dispatch = useDispatch();
    // const { cartItems, toggleCart } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const checkoutHandler = () => {
        dispatch(setCartIsOpen(false));
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(item => <CartItem cartItem={item} key={item.id} />) 
                    : <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;