import ProductCard from "../product-card/product-card.component";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// import './category-preview.styles.scss';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ( {title, products} ) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("click")
        navigate(`/shop/${title}`);
    };

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview onClick={handleClick}>
                {
                    products
                    .filter( (_,idx) => idx < 4 )
                    .map( (product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;