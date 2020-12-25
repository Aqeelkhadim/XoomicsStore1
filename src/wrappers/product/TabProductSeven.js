import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";
import {connect} from "react-redux";

const TabProductSeven = ({
                             spaceBottomClass,
                             containerClass,
                             extraClass,
                             specialProducts
                         }) => {
    return (
        <div
            className={`product-area ${spaceBottomClass ? spaceBottomClass : ""} ${
                extraClass ? extraClass : ""
            }`}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <SectionTitle titleText="DAILY DEALS!" spaceBottomClass="mb-25" positionClass="text-center"/>
                {specialProducts[0] &&
                Object.keys(specialProducts[0]).map((type) => (
                    <div className="row my-5">
                        <ProductGridTwo
                            products={specialProducts[0][type]}
                            type="new"
                            limit={8}
                            spaceBottomClass="mb-25"
                        />
                    </div>
                ))}
                <div className="view-more text-center mt-20 toggle-btn6 col-12">
                    <Link
                        className="loadMore6"
                        to={process.env.PUBLIC_URL + "/products"}
                    >
                        VIEW MORE PRODUCTS
                    </Link>
                </div>
            </div>
        </div>
    );
};

TabProductSeven.propTypes = {
    containerClass: PropTypes.string,
    extraClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    specialProducts: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        specialProducts: state.specialProducts,
    };
};

export default connect(mapStateToProps)(TabProductSeven);
// export default TabProductSeven;
