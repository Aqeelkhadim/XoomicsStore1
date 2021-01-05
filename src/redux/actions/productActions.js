import * as axios from "axios";
import {API_URL, OUTLET_ID} from "../../globalConstant";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products
export const fetchProducts = products => {
  return async function (dispatch) {
    await axios.get(`${API_URL}api/v1/outlet/${OUTLET_ID}/menu-items`)
        .then(response => {
          dispatch(fetchProductsSuccess(response.data));
        });
  };
};
