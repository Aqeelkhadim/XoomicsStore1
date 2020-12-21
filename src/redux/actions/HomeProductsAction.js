
import * as axios from "axios";
import {OUTLET_ID} from "../../globalConstant";

export const HOME_PRODUCTS = "HOME_PRODUCTS";

const homeProducts = () => {
    return async function (dispatch) {
        let one = `http://backend.xoomics.com/api/v1/outlet/${OUTLET_ID}/menu-items`;
        let two = `http://backend.xoomics.com/api/v1/outlet/${OUTLET_ID}/special-products`;
        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios.all([requestOne, requestTwo])
            .then(
                axios.spread((...responses) => {
                    const responseOne = responses[0].data;
                    const responseTwo = responses[1].data.special_offers_products;
                    const responseThree = responses[1].data.most_sold_products;
                    const allResponse= {'all': responseOne, 'sold': responseThree,'special': responseTwo}
                    console.log(allResponse)
                    dispatch(setHomeProducts(allResponse));
                })
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