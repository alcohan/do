import { createSelector } from "reselect";
import { RootState } from "../store";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state:RootState): CategoriesState => {
    return state.categories
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories;
    },
)

// "as long as Categories array does not change, do not rerun this method"
export const selectCatgoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce( (acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap)
    }
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)

// export const selectCatgoriesMap = ( state ) => 
//     state.categories.categories.reduce( (acc, category) => {
//         const { title, items } = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});