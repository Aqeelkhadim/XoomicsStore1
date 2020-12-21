import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {connect} from "react-redux";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";
import {addToCart} from "../../redux/actions/cartActions";
import {addToWishlist} from "../../redux/actions/wishlistActions";
import {addToCompare} from "../../redux/actions/compareActions";


const ProductGridTwo = ({
                            products,
                            addToCart,
                            addToWishlist,
                            addToCompare,
                            cartItems,
                            wishlistItems,
                            compareItems,
                            sliderClassName,
                            spaceBottomClass,

                        }) => {
    return (
        <Fragment>
            {products.length > 0 ? (
                    products.map(product => {
                        return (
                            <ProductGridSingleTwo
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
                ) :
                (
                    <div className="view-more text-center mt-20 toggle-btn6 col-12">
                        <h3>No products found.</h3>
                    </div>
                )}
        </Fragment>
    );
};

ProductGridTwo.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItems: PropTypes.array,
    compareItems: PropTypes.array,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItems: PropTypes.array
};

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridTwo);
