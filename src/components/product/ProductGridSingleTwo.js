import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {getDiscountPrice} from "../../helpers/product";
import ProductModal from "./ProductModal";
import {IMAGE_URL} from "../../globalConstant";

const ProductGridSingleTwo = ({
                                  product,
                                  addToCart,
                                  addToWishlist,
                                  addToCompare,
                                  cartItem,
                                  wishlistItem,
                                  compareItem,
                                  sliderClassName,
                                  spaceBottomClass
                              }) => {
    const [modalShow, setModalShow] = useState(false);
    const {addToast} = useToasts();
    const discountedPrice = getDiscountPrice(product.price, product.discount);
    return (
        <Fragment>
            <div
                className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
                    sliderClassName ? sliderClassName : ""
                }`}
            >
                <div
                    className={`product-wrap-2 ${
                        spaceBottomClass ? spaceBottomClass : ""
                    }`}
                >
                    <div className="product-img">
                        <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                            <img
                                className="default-img"
                                src={process.env.PUBLIC_URL + IMAGE_URL + product.thumbnail}
                                alt={product.name}
                                height={250}/>
                        </Link>
                        <div className="product-action-2">
                            <button
                                onClick={() => addToCart(product, addToast)}
                                className={
                                    cartItem !== undefined && cartItem.quantity > 0
                                        ? "active"
                                        : ""
                                }
                                disabled={cartItem !== undefined && cartItem.quantity > 0}
                                title={
                                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                                }
                            >
                                {" "}
                                <i className="fa fa-shopping-cart"></i>{" "}
                            </button>
                            <button onClick={() => setModalShow(true)} title="Quick View">
                                <i className="fa fa-eye"></i>
                            </button>

                            <button
                                className={compareItem !== undefined ? "active" : ""}
                                disabled={compareItem !== undefined}
                                title={
                                    compareItem !== undefined
                                        ? "Added to compare"
                                        : "Add to compare"
                                }
                                onClick={() => addToCompare(product, addToast)}
                            >
                                <i className="fa fa-retweet"></i>
                            </button>
                        </div>
                    </div>
                    <div className="product-content-2">
                        <div className="title-price-wrap-2">
                            <h3>
                                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                                    {product.name} - {product.other_name}
                                </Link>
                            </h3>
                            <div className="price-2">
                                {discountedPrice !== null ? (
                                    <Fragment>
                    <span>
                      {discountedPrice}
                    </span>{" "}
                                        <span className="old">
                      {product.price}
                    </span>
                                    </Fragment>
                                ) : (
                                    <span>{product.price}</span>
                                )}
                            </div>
                        </div>
                        <div className="pro-wishlist-2">
                            <button
                                className={wishlistItem !== undefined ? "active" : ""}
                                disabled={wishlistItem !== undefined}
                                title={
                                    wishlistItem !== undefined
                                        ? "Added to wishlist"
                                        : "Add to wishlist"
                                }
                                onClick={() => addToWishlist(product, addToast)}
                            >
                                <i className="fa fa-heart-o"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* product modal */}
            <ProductModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                product={product}
                cartitem={cartItem}
                discountedprice={discountedPrice}
                wishlistitem={wishlistItem}
                compareitem={compareItem}
                addtocart={addToCart}
                addtowishlist={addToWishlist}
                addtocompare={addToCompare}
                addtoast={addToast}
            />
        </Fragment>
    );
};

ProductGridSingleTwo.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItem: PropTypes.object,
    compareItem: PropTypes.object,
    product: PropTypes.object,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    wishlistItem: PropTypes.object
};

export default ProductGridSingleTwo;
