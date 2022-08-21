import { takeLatest, all, call, put } from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';



// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch (fetchCategoriesStart());
// }

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call( getCategoriesAndDocuments, 'categories' );
        yield* put ( fetchCategoriesSuccess( categoriesArray ));
    } catch (error) {
        yield* put ( fetchCategoriesFailed( error as Error ));
    }
}

//when we take the latest fetchcategoriesstart action, we initialize the fetchcategoriesasync saga
//this saga is going to attempt to fetch the categories from firebase
//and if that is successful we are going to PUT (which is the generator version of 'dispatch')
//this fetchcategoriessuccess with the returned categoriesarray
//otherwise we are going to dispatch a fetchcategoriesfailed
export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])
}