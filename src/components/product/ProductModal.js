import PropTypes from "prop-types";
import React, {Fragment} from "react";
// import Swiper from "react-id-swiper";
// import {getProductCartQuantity} from "../../helpers/product";
import {Modal} from "react-bootstrap";
// import Rating from "./sub-components/ProductRating";
import {connect} from "react-redux";
import {IMAGE_URL} from "../../globalConstant";

function ProductModal(props) {
    const {product} = props;
    // const { currency } = props;
    const {discountedprice} = props;

    // const [gallerySwiper, getGallerySwiper] = useState(null);
    // const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
    // const [selectedProductColor, setSelectedProductColor] = useState(
    //     product.variation ? product.variation[0].color : ""
    // );
    // const [selectedProductSize, setSelectedProductSize] = useState(
    //     product.variation ? product.variation[0].size[0].name : ""
    // );
    // const [productStock, setProductStock] = useState(
    //     product.variation ? product.variation[0].size[0].stock : product.stock
    // );
    // const [quantityCount, setQuantityCount] = useState(1);

    const wishlistItem = props.wishlistitem;
    const compareItem = props.compareitem;

    const addToCart = props.addtocart;
    const addToWishlist = props.addtowishlist;
    const addToCompare = props.addtocompare;

    const addToast = props.addtoast;
    // const cartItems = props.cartitems;


    return (
        <Fragment>
            <Modal
                show={props.show}
                onHide={props.onHide}
                className="product-quickview-modal-wrapper"
            >
                <Modal.Header closeButton></Modal.Header>

                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <div className="product-large-image-wrapper">

                                <div className="single-image">
                                    <img
                                        src={process.env.PUBLIC_URL + IMAGE_URL + product.thumbnail}
                                        className="img-fluid"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 col-xs-12">
                            <div className="product-details-content quickview-content">
                                <h2>{product.name} - {product.other_name}</h2>
                                <div className="product-details-price">
                                    {discountedprice !== null ? (
                                        <Fragment>
                                            <span>
                                                {discountedprice}
                                            </span>{" "}
                                            <span className="old">
                                            {product.price}
                                          </span>
                                        </Fragment>
                                    ) : (
                                        <span>
                                         {product.price}
                                        </span>
                                    )}
                                </div>
                                <div className="pro-details-list">
                                    <p>{product.detail}</p>
                                </div>

                                <div className="pro-details-quality">
                                    <div className="pro-details-cart btn-hover">
                                        <button
                                            onClick={() =>
                                                addToCart(
                                                    product,
                                                    addToast,
                                                )
                                            }
                                        >
                                            {" "}
                                            Add To Cart{" "}
                                        </button>

                                    </div>
                                    <div className="pro-details-wishlist">
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
                                            <i className="pe-7s-like"/>
                                        </button>
                                    </div>
                                    <div className="pro-details-compare">
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
                                            <i className="pe-7s-shuffle"/>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}

ProductModal.propTypes = {
    addtoast: PropTypes.func,
    addtocart: PropTypes.func,
    addtocompare: PropTypes.func,
    addtowishlist: PropTypes.func,
    cartitems: PropTypes.array,
    compareitem: PropTypes.object,
    currency: PropTypes.object,
    discountedprice: PropTypes.number,
    onHide: PropTypes.func,
    product: PropTypes.object,
    show: PropTypes.bool,
    wishlistitem: PropTypes.object
};

const mapStateToProps = state => {
    return {
        cartitems: state.cartData
    };
};

export default connect(mapStateToProps)(ProductModal);
