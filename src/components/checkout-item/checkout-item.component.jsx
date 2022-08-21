import { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from "../../store/cart/cart.action";

import { CheckoutItemContainer, ImageContainer, } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const decrementButtonHandler = () => {
        if (quantity>0)
            dispatch(removeItemFromCart(cartItems, cartItem));
    };
    const incrementButtonHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    };
    const deleteButtonHandler = () => {
        dispatch(deleteItemFromCart(cartItems, cartItem));
    };
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <span className='name'>
                <span>{name}</span>
            </span>
            <span className='quantity'>
                <div className='arrow' onClick={decrementButtonHandler}>&#10094;</div>
                <span className='value'>
                    {quantity}
                </span>
                <div className='arrow' onClick={incrementButtonHandler}>&#10095;</div>
            </span>
            <span className='price'>
                {price * quantity}
            </span>
            <div className='remove-button' onClick={deleteButtonHandler}>
                &#10005;
            </div>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;