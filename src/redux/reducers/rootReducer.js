// import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import homeProductsReducer from "./homeProductsReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  // currencyData: currencyReducer,
  productData: productReducer,
  specialProducts: homeProductsReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer
});

export default rootReducer;
