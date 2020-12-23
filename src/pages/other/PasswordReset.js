import PropTypes from "prop-types";
import React, {Fragment, useState} from "react";
import MetaTags from "react-meta-tags";
import {Link} from "react-router-dom";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {useForm} from "react-hook-form";
import "../../error/error.css";
import axios from "axios";
import Error from "../../error/Error";

const PasswordReset = props => {
    let {location} = props;
    const {pathname} = location;

    const {handleSubmit, register, errors} = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [message, setMessage] = useState('');

    const Reset_Password = async (data) => {
        setLoading(true);
        await axios.post("/api/password/email", data)
            .then(response => {
                if (response.data.message) {
                    setError({});
                    setMessage(response.data.message);
                } else {
                    if (response.data.error) {
                        setError(response.data)
                    }
                }
                setLoading(false);
            }).catch(error => {
                console.log(error.response.data);
                setMessage('');
                setError(error.response.data);
                setLoading(false);
            });
    };

    return (

        <Fragment>
            <MetaTags>
                <title>Lebress | Reset Password</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={pathname}>
                Reset Password
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
                                            <h4 className="login-register-tab-list"><b>Reset Password</b></h4>
                                            {message ? <div className="text-green">{message}</div> : ''}
                                            <form onSubmit={handleSubmit(Reset_Password)}>
                                                <div className="mb-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        ref={register({
                                                            required: <div className="text-red">You can't leave this
                                                                empty</div>,
                                                            pattern: {
                                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i,
                                                                message: <div className="text-red">Invalid email
                                                                    address</div>
                                                            }
                                                        })}
                                                    />
                                                    {errors.email && errors.email.message}
                                                    <Error
                                                        error={error["error"] ? error["error"] : null}
                                                    />
                                                </div>

                                                <div className="button-box">
                                                    <button type="submit">
                                                        {loading && <i className="fa fa-refresh fa-spin fa-2x"> </i>} <span> Reset</span>
                                                    </button>
                                                </div>
                                                <div className="register mt-3">
                                                    <b> <Link to={"/login"}>
                                                        Back to Login
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
PasswordReset.propTypes = {
    location: PropTypes.object
};

export default PasswordReset;
