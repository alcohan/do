import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div>
            <h1>
                Checkout page
            </h1>
            {cartItems.map( (item) => (
                <CheckoutItem cartItem={item} key={item.id}/>
                ) 
            )}
        </div>
    );
};

export default Checkout;