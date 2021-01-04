import PropTypes from "prop-types";
import React from "react";
import {
    getIndividualCategories,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";

const ShopSidebar = ({products,getSortParams, sideSpaceClass}) => {
    const uniqueCategories = getIndividualCategories(products);

    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
            {/* shop search */}
            <ShopSearch getSortParams={getSortParams} />
            {/* filter by categories */}
            <ShopCategories
                categories={uniqueCategories}
                getSortParams={getSortParams}
            />
        </div>
    );
};

ShopSidebar.propTypes = {
    getSortParams: PropTypes.func,
    products: PropTypes.array,
    sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
