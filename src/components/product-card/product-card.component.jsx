import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer, Name, Price, Img} from './product-card.styles.jsx';

const ProductCard = ( { product } ) => {
    const { name, price, imageUrl } = product;
     const { addItemToCart } = useContext(CartContext);

     const addProductToCart = () => addItemToCart(product);

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