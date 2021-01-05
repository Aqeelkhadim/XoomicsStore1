import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import MetaTags from "react-meta-tags";
import {connect} from "react-redux";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {getDiscountPrice} from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import {API_URL, OUTLET_ID} from "../../globalConstant";
import * as axios from "axios";
import swal from 'sweetalert';

const Checkout = ({location, cartItems}) => {
    const {pathname} = location;
    let cartTotalPrice = 0;
    const token = localStorage.getItem('access_token');
    const userdata = jwtDecode(token);

    const orderItems = cartItems.map(item => {
        const discountedPrice = getDiscountPrice(
            item.price,
            item.discount
        );
        return {
            "productId": item.id,
            "productPrice": item.price,
            "productTitle": item.name,
            "quantity": item.quantity,
            "sum": discountedPrice * item.quantity
        }
    });
    return (
        <Fragment>
            <MetaTags>
                <title>Flone | Checkout</title>
                <meta
                    name="description"
                    content="Checkout page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Checkout
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
                <div className="checkout-area pt-95 pb-100">
                    <div className="container">
                        {cartItems && cartItems.length >= 1 ? (
                            <div className="row">
                                <div className="col-lg-7">
                                    <Formik
                                        initialValues={{
                                            name: userdata.name,
                                            email: userdata.email,
                                            address: '',
                                            city: '',
                                            state: '',
                                            zip: '',
                                            phone: userdata.phone,
                                            description: ''
                                        }}
                                        validationSchema={Yup.object().shape({
                                            name: Yup.string()
                                                .min(4, 'Too Short!')
                                                .max(50, 'Too Long!')
                                                .required('Name is required'),
                                            email: Yup.string().email('Invalid email').required('Email is required'),
                                            address: Yup.string().required('Address is required'),
                                            city: Yup.string().required('City is required'),
                                            state: Yup.string().required('State is required'),
                                            zip: Yup.string().required('Zipcode/Postal code is required'),
                                            phone: Yup.number().required('Phone is required'),
                                        })}
                                        onSubmit={
                                            async (values) => {
                                                const requestData = {
                                                    location: {
                                                        address: values.address + ", " + values.city + ", " + values.state + ", " + values.zip,
                                                        id: 'id',
                                                        image: 'image',
                                                        lat: 'lat',
                                                        lng: 'lng',
                                                        mobile: values.phone,
                                                        title: values.name
                                                    },
                                                    items: orderItems,
                                                    totalAmount: cartTotalPrice.toFixed(2),
                                                    type: "web"
                                                }
                                                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                                                await axios.post(`${API_URL}api/v1/outlet/${OUTLET_ID}/cashier-orders`, requestData)
                                                    .then(response => {
                                                        if (response) {
                                                            swal({
                                                                title: "Order Done!",
                                                                text: "You Order Receive Successfully!",
                                                                icon: "success",
                                                                button: false,
                                                                timer: 3000,
                                                            });
                                                            setTimeout(() => {
                                                                localStorage.removeItem('redux_localstorage_simple')
                                                                window.location.href = `/profile/${userdata.name}`;
                                                            }, 3000);
                                                        }
                                                    });
                                            }
                                        }
                                    >
                                        {({errors, touched, values, handleSubmit}) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="billing-info-wrap">
                                                    <h3>Billing Details</h3>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="billing-info mb-20">
                                                                <label>Full Name</label>
                                                                <Field name="name"
                                                                       readOnly={true}
                                                                       placeholder="Full name *"
                                                                       value={values.name}/>
                                                                {errors.name && touched.name ?
                                                                    <div
                                                                        className="text-danger">{errors.name}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info mb-20">
                                                                <label>Email Address</label>
                                                                <Field name="email"
                                                                       placeholder="email *"
                                                                       readOnly={true}
                                                                />
                                                                {errors.email && touched.email ?
                                                                    <div
                                                                        className="text-danger">{errors.email}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="billing-info mb-20">
                                                                <label>Phone</label>
                                                                <Field name="phone"
                                                                       placeholder="Phone *"/>
                                                                {errors.phone && touched.phone ?
                                                                    <div
                                                                        className="text-danger">{errors.phone}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="billing-info mb-20">
                                                                <label>Address</label>
                                                                <Field className="form-control" name="address"
                                                                       placeholder="Address....."/>
                                                                {errors.address && touched.address ?
                                                                    <div
                                                                        className="text-danger">{errors.address}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="billing-info mb-20">
                                                                <label>Town / City</label>
                                                                <Field name="city"
                                                                       placeholder="Town / City *"/>
                                                                {errors.city && touched.city ?
                                                                    <div
                                                                        className="text-danger">{errors.city}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="billing-info mb-20">
                                                                <label>State / County</label>
                                                                <Field name="state"
                                                                       placeholder="State / County *"/>
                                                                {errors.state && touched.state ? <div
                                                                    className="text-danger">{errors.state}</div> : null}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="billing-info mb-20">
                                                                <label>Postcode / ZIP</label>
                                                                <Field name="zip"
                                                                       placeholder="Postcode / ZIP *"/>
                                                                {errors.zip && touched.zip ?
                                                                    <div
                                                                        className="text-danger">{errors.zip}</div> : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="additional-info-wrap">
                                                        <h4>Additional information</h4>
                                                        <div className="additional-info">
                                                            <label>Order notes</label>
                                                            <Field as="textarea"
                                                                   placeholder="Notes about your order, e.g. special notes for delivery (Optional)."
                                                                   className="form-control" name="description"
                                                                   rows="4"/>
                                                        </div>
                                                    </div>
                                                    <div className="place-order mt-25">
                                                        <button className="btn-hover">Place Order</button>
                                                    </div>
                                                </div>

                                            </form>
                                        )}
                                    </Formik>
                                </div>
                                <div className="col-lg-5">
                                    <div className="your-order-area">
                                        <h3>Your order</h3>
                                        <div className="your-order-wrap gray-bg-4">
                                            <div className="your-order-product-info">
                                                <div className="your-order-top">
                                                    <ul>
                                                        <li>Product</li>
                                                        <li>Total</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-middle">
                                                    <ul>
                                                        {cartItems.map((cartItem, key) => {
                                                            const discountedPrice = getDiscountPrice(
                                                                cartItem.price,
                                                                cartItem.discount
                                                            );
                                                            discountedPrice != null
                                                                ? (cartTotalPrice +=
                                                                discountedPrice * cartItem.quantity)
                                                                : (cartTotalPrice +=
                                                                cartItem.price * cartItem.quantity);
                                                            return (
                                                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                                                    <span className="order-price">
                                    {discountedPrice !== null
                                        ?
                                        (
                                            discountedPrice *
                                            cartItem.quantity
                                        )
                                        :
                                        (
                                            cartItem.price * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="your-order-bottom">
                                                    <ul>
                                                        <li className="your-order-shipping">Shipping</li>
                                                        <li>Free shipping</li>
                                                    </ul>
                                                </div>
                                                <div className="your-order-total">
                                                    <ul>
                                                        <li className="order-total">Total</li>
                                                        <li>
                                                            {
                                                                cartTotalPrice.toFixed(2)}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-cash"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            No items found in cart to checkout <br/>{" "}
                                            <Link to={process.env.PUBLIC_URL + "/products"}>
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Checkout.propTypes = {
    cartItems: PropTypes.array,
    location: PropTypes.object
};

const mapStateToProps = state => {
    return {
        cartItems: state.cartData,
    };
};

export default connect(mapStateToProps)(Checkout);
