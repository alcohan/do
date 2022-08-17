import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector, useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer } from './product-card.styles.jsx';

const ProductCard = ( { product } ) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (    
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >+add</Button>
            </div>
        </ProductCardContainer>
    );
};

export default ProductCard;