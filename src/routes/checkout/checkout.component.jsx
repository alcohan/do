import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

// import './checkout.styles.scss';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span >Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span >Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span >Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span >Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span >Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map( (item) => (
                <CheckoutItem cartItem={item} key={item.id}/>
                ) 
            )}
            <Total>
                Total: ${cartItems.reduce( (total, item) => total+item.price*item.quantity, 0)}
            </Total>
        </CheckoutContainer>
    );
};

export default Checkout;