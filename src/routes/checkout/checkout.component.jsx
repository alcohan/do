import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartSubtotal } from "../../store/cart/cart.selector";

// import './checkout.styles.scss';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartSubtotal = useSelector(selectCartSubtotal);

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
                Total: ${cartSubtotal
                // cartItems.reduce( (total, item) => total+item.price*item.quantity, 0)
                }
            </Total>
        </CheckoutContainer>
    );
};

export default Checkout;