
import * as axios from "axios";
import {OUTLET_ID} from "../../globalConstant";

export const HOME_PRODUCTS = "HOME_PRODUCTS";

const homeProducts = () => {
    return async function (dispatch) {
        axios.get(`http://demo-backend.xoomics.com/api/v1/outlet/${OUTLET_ID}/special-products`)
            .then(
                responses => {
                    const responseTwo = responses.data.special_offers_products;
                    const allResponse= {'special': responseTwo}
                    dispatch(setHomeProducts(allResponse));
                }
            )
            .catch(errors => {
                console.error(errors);
            });

    };
};

export const setHomeProducts = (specialProducts = []) => {
    return{
        type: HOME_PRODUCTS,
        payload: specialProducts,
    };
};

export default homeProducts;