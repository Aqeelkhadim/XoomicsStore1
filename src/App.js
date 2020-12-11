// import PropTypes from "prop-types";
import React, {Suspense, lazy} from "react";
import ScrollToTop from "./helpers/scroll-top";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {ToastProvider} from "react-toast-notifications";
// import { multilanguage, loadLanguages } from "redux-multilanguage";
// import { connect } from "react-redux";
import {BreadcrumbsProvider} from "react-breadcrumbs-dynamic";
import AuthRoute from "./authcomponent/AuthRoute";
import GuestRoute from "./authcomponent/GuestRoute";

// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashionFive"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

const ProductTabRight = lazy(() =>
    import("./pages/shop-product/ProductTabRight")
);

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));
const ForgotPassword = lazy(() => import("./pages/other/PasswordReset"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {

    return (
        <ToastProvider placement="bottom-left">
            <BreadcrumbsProvider>
                <Router>
                    <ScrollToTop>
                        <Suspense
                            fallback={
                                <div className="flone-preloader-wrapper">
                                    <div className="flone-preloader">
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            }
                        >
                            <Switch>
                                <Route
                                    exact
                                    path={process.env.PUBLIC_URL + "/"}
                                    component={HomeFashion}
                                />

                                {/* Shop pages */}
                                <Route
                                    path={process.env.PUBLIC_URL + "/products"}
                                    component={ShopGridStandard}
                                />

                                {/* Shop product pages */}
                                <Route
                                    path={process.env.PUBLIC_URL + "/product/:id"}
                                    render={routeProps => (
                                        <Product {...routeProps} key={routeProps.match.params.id}/>
                                    )}
                                />

                                <Route
                                    path={process.env.PUBLIC_URL + "/product-tab-right/:id"}
                                    component={ProductTabRight}
                                />

                                {/* Other pages */}
                                <Route
                                    path={process.env.PUBLIC_URL + "/about-us"}
                                    component={About}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + "/contact-us"}
                                    component={Contact}
                                />
                                <AuthRoute
                                    path={process.env.PUBLIC_URL + "/profile/:name"}
                                    component={MyAccount}
                                />
                                <GuestRoute
                                    path={process.env.PUBLIC_URL + "/login"}
                                    component={Login}
                                />
                                <GuestRoute
                                    path={process.env.PUBLIC_URL + "/register"}
                                    component={Register}
                                />
                                <GuestRoute
                                    path={process.env.PUBLIC_URL + "/forgot-password"}
                                    component={ForgotPassword}
                                />

                                <Route
                                    path={process.env.PUBLIC_URL + "/cart"}
                                    component={Cart}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + "/wishlist"}
                                    component={Wishlist}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + "/compare"}
                                    component={Compare}
                                />
                                <Route
                                    path={process.env.PUBLIC_URL + "/checkout"}
                                    component={Checkout}
                                />

                                <Route
                                    path={process.env.PUBLIC_URL + "/not-found"}
                                    component={NotFound}
                                />

                                <Route exact component={NotFound}/>
                            </Switch>
                        </Suspense>
                    </ScrollToTop>
                </Router>
            </BreadcrumbsProvider>
        </ToastProvider>
    );
};


export default App;
