import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {connect} from "react-redux";
import {addToCart} from "../../redux/actions/cartActions";
import {addToWishlist} from "../../redux/actions/wishlistActions";
import {addToCompare} from "../../redux/actions/compareActions";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import {isEmptyArray} from "formik";

const ProductGrid = ({
                         products,
                         addToCart,
                         addToWishlist,
                         addToCompare,
                         cartItems,
                         wishlistItems,
                         compareItems,
                         sliderClassName,
                         spaceBottomClass
                     }) => {
    return (
        <Fragment>
            {!isEmptyArray(products) ?
                products.map(product => {
                    return (
                        <ProductGridListSingle
                            sliderClassName={sliderClassName}
                            spaceBottomClass={spaceBottomClass}
                            product={product}
                            addToCart={addToCart}
                            addToWishlist={addToWishlist}
                            addToCompare={addToCompare}
                            cartItem={
                                cartItems.filter(cartItem => cartItem.id === product.id)[0]
                            }
                            wishlistItem={
                                wishlistItems.filter(
                                    wishlistItem => wishlistItem.id === product.id
                                )[0]
                            }
                            compareItem={
                                compareItems.filter(
                                    compareItem => compareItem.id === product.id
                                )[0]
                            }
                            key={product.id}
                        />
                    );
                })
                :
                <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-search"/>
                    </div>
                    <div className="item-empty-area__text">
                        Not Found
                    </div>
                </div>
            }
        </Fragment>
    );
};

ProductGrid.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItems: PropTypes.array,
    compareItems: PropTypes.array,
    products: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
    return {
        cartItems: state.cartData,
        wishlistItems: state.wishlistData,
        compareItems: state.compareData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (
            item,
            addToast,
            quantityCount,
        ) => {
            dispatch(
                addToCart(
                    item,
                    addToast,
                    quantityCount,
                )
            );
        },
        addToWishlist: (item, addToast) => {
            dispatch(addToWishlist(item, addToast));
        },
        addToCompare: (item, addToast) => {
            dispatch(addToCompare(item, addToast));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
