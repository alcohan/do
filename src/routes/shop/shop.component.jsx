import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { fetchCategoriesStart } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch();

    // categories component init run setup
    useEffect( () => {
        dispatch(fetchCategoriesStart());
    },[]);
    // end categories setup

    return(
        <Routes>
            <Route index element={ <CategoriesPreview /> } />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
};

export default Shop;