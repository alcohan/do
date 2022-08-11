import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

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
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
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
        </div>
    );
};

export default CheckoutItem;