import PropTypes from "prop-types";
import React, {Fragment, useRef, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import "../../error/error.css";
import axios from "axios";
import Error from "../../error/Error";
import {KEY} from "../../globalConstant";
import swal from "sweetalert";

const Register = props => {
    let {location} = props;
    const {pathname} = location;

    const {handleSubmit, register, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch('password', '');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const register_user = async (data,{setStatus, resetForm}) => {
        data['key']=KEY;
        setLoading(true);
        await axios.post("http://backend.xoomics.com/api/auth/signup", data)
            .then(response => {
                swal({
                    title: "Welcome "+response.data.name+"!",
                    text: "Your account created in our system Successfully, Please check email and verify it then you can buy anything from us.",
                    icon: "success",
                    buttons: {
                        confirm: "Ok",
                    },
                    closeOnClickOutside: false,
                });
                setLoading(false);
                resetForm({})
                setStatus({success: true})
            })
            .catch(error => {
                setError('User Already exist');
                setLoading(false);
            });
    };
    return (
        <Fragment>
            <MetaTags>
                <title>Lebress | Register</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={pathname}>
                Register
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
                                            <h4 className="login-register-tab-list"><b>Create an account (Register)</b>
                                            </h4>
                                            <form onSubmit={handleSubmit(register_user)}>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="user name"
                                                        ref={register({required: true})}
                                                    />
                                                    {errors.name &&
                                                    <div className="text-red">User name is required</div>}
                                                    <Error error={ error? error: null }/>
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        placeholder="phone"
                                                        ref={register({required: true})}
                                                    />
                                                    {errors.name &&
                                                    <div className="text-red">Phone number is required</div>}
                                                </div>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        ref={register({
                                                            required: <div className="text-red">Email is
                                                                Required</div>,
                                                            pattern: {
                                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                                                                message: <div className="text-red">Invalid
                                                                    email address</div>
                                                            }
                                                        })}
                                                    />
                                                    {errors.email && errors.email.message}
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
                                                                message: <div className="text-red">Password
                                                                    minimum of 8 character</div>
                                                            }
                                                        })}
                                                    />
                                                    {errors.password && errors.password.message}
                                                </div>
                                                <div className="mb-3">

                                                    <input
                                                        type="password"
                                                        name="password_confirmation"
                                                        placeholder="Confirm Password"
                                                        ref={register({
                                                            validate: value =>
                                                                value === password.current ||
                                                                <div className="text-red">The passwords do not
                                                                    match</div>
                                                        })}
                                                    />
                                                    {errors.password_confirmation &&
                                                    <div>{errors.password_confirmation.message}</div>}
                                                </div>
                                                <div className="button-box">
                                                    <button type="submit">
                                                        {loading && <i className="fa fa-refresh fa-spin fa-2x"> </i>}
                                                        <span> Register</span>
                                                    </button>
                                                </div>
                                                <div className="register mt-3">
                                                    <b>Already member? <Link to={"/login"}>
                                                        Login here
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
Register.propTypes = {
    location: PropTypes.object
};

export default Register;

