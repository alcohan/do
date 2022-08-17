import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    // console.log('selector 1 fired');
    return state.categories
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        // console.log('selector 2 fired');
        return categoriesSlice.categories;
    },
)

// "as long as Categories array does not change, do not rerun this method"
export const selectCatgoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        // console.log('selector 3 fired');
        return categories.reduce( (acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
    }
)

// export const selectCatgoriesMap = ( state ) => 
//     state.categories.categories.reduce( (acc, category) => {
//         const { title, items } = category;
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {});