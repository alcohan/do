import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div>
            <h1>
                Checkout page
            </h1>
            {cartItems.map( (item) => (
                <div id={item.id}>
                    <div >{item.name}</div>
                    <span >{item.quantity}</span>
                    <span >{item.price}</span>
                    <button>Remove</button>
                </div>
                ) 
            )}
        </div>
    );
};

export default Checkout;