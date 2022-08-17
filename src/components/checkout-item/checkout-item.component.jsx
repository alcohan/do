import { useContext } from "react";
import { useSelector } from 'react-redux';

// import { addItemToCart, removeItemFromCart, deleteItemFromCart } from "../../store/cart/cart.action.js";
import { CartContext } from "../../contexts/cart.context";

import { CheckoutItemContainer, ImageContainer, } from './checkout-item.styles.jsx';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);

    const decrementButtonHandler = () => {
        if (quantity>0)
            removeItemFromCart(cartItem);
    };
    const incrementButtonHandler = () => {
        addItemToCart(cartItem);
    };
    const deleteButtonHandler = () => {
        deleteItemFromCart(cartItem);
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