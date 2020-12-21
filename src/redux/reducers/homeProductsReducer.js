export const HOME_PRODUCTS = "HOME_PRODUCTS";
export const specialProductsInitialState = [];

const homeProductsReducer = (state = specialProductsInitialState, action) => {
    switch (action.type) {
        case HOME_PRODUCTS:
            return [action.payload];
        default:
            return state;
    }
};

export default homeProductsReducer;