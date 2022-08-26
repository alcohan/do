import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import { ProductCardContainer } from '../product-card/product-card.styles';

export const CategoryPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    // margin-left: 20px;
    // margin-right: 20px;

    @media screen and (max-width:800px) {
        align-items: center;
    }

    ${ProductCardContainer} {

    }
`

export const Title = styled(Link)`
    font-size: 38px;
    margin-bottom: 25px;
    cursor: pointer;
`

export const Preview = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    overflow: hidden;

    @media screen and (max-width:800px) {
        align-items: center;
        grid-template-columns: repeat(4, 20vw);
        grid-gap 15px;

        ${ProductCardContainer} {
            Button{
                display:none;
            }
            .footer{
                display: none;
            }
        }
    }
`


// .category-preview-container {
    // display: flex;
    // flex-direction: column;
    // margin-bottom: 30px;
  
//     .title {
//       font-size: 28px;
//       margin-bottom: 25px;
//       cursor: pointer;
//     }
  
//     .preview {
//       display: grid;
//       grid-template-columns: repeat(4, 1fr);
//       column-gap: 20px;
//     }
//   }
  