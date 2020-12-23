import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {Link} from "react-router-dom";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useForm} from "react-hook-form";

import Error from "../../error/Error";
import axios from "axios";
import '../../error/error.css';
import {KEY} from "../../globalConstant";


const Login = props => {

    let {location} = props;
    const {pathname} = location;

    const {handleSubmit, register, errors} = useForm();
    // Get saved data from sessionStorage

    const data = sessionStorage.getItem('success');
    if (data) {
        setTimeout(function () {
            sessionStorage.clear();
        }, (8000)); // 8 second
    }

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const login_handle_form = async (data) => {
        data['key']=KEY;
        setLoading(true);
        await axios.post("http://demo-backend.xoomics.com/api/auth/login", data)
            .then(response => {
                console.log(response)
                localStorage.setItem('access_token', (response.data.token));
                setLoading(false);
                props.history.push("/")
            }).catch(response => {
                setError("Invalid email or password");
                setLoading(false);
            });
    };
    return (

        <Fragment>
            <MetaTags>
                <title>Lebress | Login</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={pathname}>
                Login
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        <div className="login-register-form">
                                            <h4 className="login-register-tab-list"><b>Login</b></h4>
                                            <form onSubmit={handleSubmit(login_handle_form)}>
                                                {data ? <div className="text-green">{data}</div> : ''}

                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        ref={register({
                                                            required: <div className="text-red">Email is Required</div>,
                                                            pattern: {
                                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                                                                message: <div className="text-red">Invalid email
                                                                    address</div>
                                                            }
                                                        })}
                                                    />
                                                    {errors.email && errors.email.message}
                                                    <Error
                                                        error={error ? error : null}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        ref={register({
                                                            required: <div className="text-red">Password is
                                                                Required</div>,
                                                            minLength: {
                                                                value: 8,
                                                                message: <div className="text-red">Password minimum of 8
                                                                    character</div>
                                                            }
                                                        })}
                                                    />
                                                    {errors.password && errors.password.message}
                                                </div>

                                                <div className="button-box">
                                                    <div className="login-toggle-btn">
                                                        <input type="checkbox" name="remember_me"/>
                                                        <label className="ml-10">Remember me</label>
                                                        <Link to={"/forgot-password"}>
                                                            Forgot Password?
                                                        </Link>
                                                    </div>
                                                    <button type="submit">
                                                        {loading && <i className="fa fa-refresh fa-spin fa-2x"> </i>}
                                                        <span> Login</span>
                                                    </button>
                                                </div>
                                                <div className="register mt-3">
                                                    <b>New member? <Link to={"/register"}>
                                                        Create an account
                                                    </Link>
                                                    </b>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Login.propTypes = {
    location: PropTypes.object
};
export default Login;

