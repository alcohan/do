import { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
    const { Product } = useContext(ProductContext);
    return (
        <div className='products-container'>
            {
                Product ?
                (Product.map( ( product ) => 
                    <ProductCard key={product.id} product={product}/>
                ))
                : "No products loaded."
            }
        </div>
    )
};

export default Shop;