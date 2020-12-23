import React, {useState} from "react";
import {searchProduct} from "../../helpers/product";
import PropTypes from "prop-types";

const ShopSearch = (products) => {
    const [search, setSearch] = useState('');
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <div className="pro-sidebar-search-form">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                           placeholder="Search here..."/>
                    <button onClick={
                        () => {
                            searchProduct(search, products);
                        }
                    }>
                        <i className="pe-7s-search"/>
                    </button>
                </div>
            </div>
        </div>
    );
};
ShopSearch.propTypes = {
    products: PropTypes.array,
};

export default ShopSearch;
