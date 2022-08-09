import { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';

const Shop = () => {
    const { Product } = useContext(ProductContext);
    return (
        <div>
            {
                Product ?
                (Product.map( ( {id, name, imageUrl, price} ) => 
                    <div key={id}>
                        <h1>{name}</h1>
                    </div>
                ))
                : "No products loaded."
            }
        </div>
    )
};

export default Shop;