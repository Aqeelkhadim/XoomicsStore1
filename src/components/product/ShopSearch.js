import React, {useState} from "react";
import PropTypes from "prop-types";

const ShopSearch = ({getSortParams}) => {
    const [search, setSearch] = useState('');
    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Search </h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <div className="pro-sidebar-search-form">
                    <input type="text" value={search}
                           onChange={
                               e => {
                                   getSortParams("search", e.target.value)
                                   setSearch(e.target.value)
                               }
                           }
                           placeholder="Search here..." />
                    <button onClick={
                        () => {
                            getSortParams("search",search)
                        }
                    }>
                        <i className="pe-7s-search"/>
                    </button>
                </div>
                {search ?
                    <div className="align-content-end">
                        <p style={{cursor: 'pointer',float: 'right'}} onClick={
                            () => {
                                setSearch('')
                                getSortParams("search", '')
                            }
                        }>Clear Search</p>
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
};
ShopSearch.propTypes = {
    getSortParams: PropTypes.func,
};

export default ShopSearch;
