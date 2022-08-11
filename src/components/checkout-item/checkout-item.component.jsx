import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

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
        <div >
            <img src={imageUrl} alt={`${name}`}/>
            <h3 >{name}</h3>
            <div >
                <button onClick={decrementButtonHandler}>Less</button>
                {quantity}
                <button onClick={incrementButtonHandler}>More</button>
            </div>
            <div >{price}</div>
            <button onClick={deleteButtonHandler}>Remove</button>
        </div>
    );
};

export default CheckoutItem;