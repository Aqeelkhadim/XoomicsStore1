import PropTypes from "prop-types";
import React, {Fragment, useEffect, useState} from "react";
import MetaTags from "react-meta-tags";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import jwtDecode from "jwt-decode";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import swal from "sweetalert";
import {OUTLET_ID} from "../../globalConstant";
import MyVerticallyCenteredModal from "../../Modal";
import {Field, Formik} from "formik";
import * as Yup from "yup";

const MyAccount = ({location}) => {
    const {pathname} = location;
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState(false);

    const [dashboard, setDashboard] = useState([]);
    const token = localStorage.getItem('access_token');
    const userdata = jwtDecode(token);

    useEffect(() => {
        async function DashboardData() {
            if (token) {
                let dashboardData = "http://backend.xoomics.com/api/v1/user/" + userdata.id + "/dashboard-data";
                let orders = "http://backend.xoomics.com/api/v1/user/" + userdata.id + "/orders";
                let address = "http://backend.xoomics.com/api/v1/get-addresses";

                const requestOne = axios.get(dashboardData);
                const requestTwo = axios.get(orders);
                const requestThree = axios.get(address, {
                    params: {
                        user_id: userdata.id
                    }
                });

                axios.all([requestOne, requestTwo, requestThree])
                    .then(
                        axios.spread((...responses) => {
                            const responseOne = responses[0].data;
                            const responseTwo = responses[1].data;
                            const responseThree = {
                                address1: responses[2].data.address1 != null ? responses[2].data.address1.split("=") : null,
                                address2: responses[2].data.address2 != null ? responses[2].data.address2.split("=") : null
                            }
                            const allResponse = {
                                'dashboardData': responseOne,
                                'allOrders': responseTwo,
                                'addresses': responseThree,
                            }
                            setDashboard(allResponse);
                        })
                    )
                    .catch(errors => {
                        console.error(errors);
                    });
            }
        }

        DashboardData();
    }, [token,userdata.id]);
    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    };
    const [resetState, setResetState] = useState(false)
    const [Error, setError] = useState("");
    const [address, setAddress] = useState(false)
    const cancelAddress = () => {
        setAddress(false);
    }
    const addressPost = async (values) => {
        const data = {
            user_id: values.user_id,
            address_line1: values.address_line1,
            city1: values.city1,
            state1: values.state1,
            zip1: values.zip1,
            address_line2: values.check ? values.address_line1 : values.address_line2,
            city2: values.check ? values.city1 : values.city2,
            state2: values.check ? values.state1 : values.state2,
            zip2: values.check ? values.zip1 : values.zip2,
        }

        await axios.post("http://backend.xoomics.com/api/v1/update-addresses", data)
            .then(response => {
                swal({
                    title: "Address Updated Successfully!",
                    text: "Your address has been updated successfully.",
                    icon: "success",
                    button: false,
                    timer: 1000,
                });
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            });

    }
    const ModalData = (orderData) => {
        setModalShow(true)
        setModalData(orderData)
    }
    const CancelOrder = async (id, status) => {
        if (status !== '0') {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.put(`http://backend.xoomics.com/api/v1/outlet/${OUTLET_ID}/cashier-orders/${id}/update`, {status: 0})
                .then(response => {
                    swal({
                        title: "Order canceled Successfully!",
                        text: "Your order has been canceled successfully.",
                        icon: "success",
                        button: false,
                        timer: 2000,
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                });
        } else if (status === '4' || status === '4') {
            if (status === '4') {
                swal({
                    title: "Not able to cancel order!",
                    text: "Order in delivery Process, So don't able to cancel order",
                    icon: "error",
                    button: false,
                    timer: 2000,
                })
            }
            if (status === '5') {
                swal({
                    title: "Order Already Delivered!",
                    text: "Order already delivered, So don't able to cancel order",
                    icon: "error",
                    button: false,
                    timer: 2000,
                })
            }
        } else {
            swal({
                title: "Order already canceled!",
                text: "Already canceled",
                icon: "warning",
                button: false,
                timer: 2000,
            });
        }
    }

    const resetSubmit = async (values, {setStatus, resetForm}) => {
        setResetState(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post("http://backend.xoomics.com/api/v1/reset-password", values)
            .then(response => {
                swal({
                    title: "Reset Password Successfully!",
                    text: "Your Password has been reset.",
                    icon: "success",
                    button: false,
                    timer: 2000,
                });
                setResetState(false)
                resetForm({})
                setStatus({success: true})
            }).catch((error) => {
                setResetState(false)
                setError("You entered wrong current password");
            });
    }

    return (
        <Fragment>
            <MetaTags>
                <title>Flone | My Account</title>
                <meta
                    name="description"
                    content="Compare page of flone react minimalist eCommerce template."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                My Account
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>
                <div className="myaccount-area pb-80 pt-100">
                    <>

                        {dashboard && dashboard.dashboardData && dashboard.allOrders ?
                            <>
                                {modalShow ?
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        data={modalData}
                                        onHide={() => setModalShow(false)}
                                    />
                                    :
                                    ''
                                }
                                <div className="container">
                                    <div className="row">
                                        <div className="ml-auto mr-auto col-lg-9">
                                            <div className="myaccount-wrapper">
                                                <Accordion defaultActiveKey="0">
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="0">
                                                                <h3 className="panel-title">
                                                                    <span>1 .</span> Profile Detail{" "}
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="account-info-wrapper">
                                                                        <h4>My Account Information</h4>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="billing-info">
                                                                                <label>Full Name</label>
                                                                                <input type="text" value={userdata.name}
                                                                                       readOnly={true}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6">
                                                                            <div className="billing-info">
                                                                                <label>Phone</label>
                                                                                <input type="text0"
                                                                                       value={userdata.phone}
                                                                                       readOnly={true}/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 col-md-12">
                                                                            <div className="billing-info">
                                                                                <label>Email Address</label>
                                                                                <input type="email"
                                                                                       value={userdata.email}
                                                                                       readOnly={true}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*<div className="billing-back-btn">*/}
                                                                    {/*  <div className="billing-btn">*/}
                                                                    {/*    <button type="submit">Continue</button>*/}
                                                                    {/*  </div>*/}
                                                                    {/*</div>*/}
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="1">
                                                                <h3 className="panel-title">
                                                                    <span>2 .</span> Dashboard
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="1">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="account-info-wrapper">
                                                                        <h5>Dashboard</h5>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        {dashboard.dashboardData.length > 0 ? dashboard.dashboardData.map((dash, index) =>
                                                                            <div className="col-lg-4 col-sm-6"
                                                                                 key={index}>
                                                                                <div
                                                                                    className="icon_box icon_box_style3">
                                                                                    <div className="icon_box_content">
                                                                                        <h6><b>{dash.title}</b></h6>
                                                                                        <p>{dash.states}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : ''}
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="2">
                                                                <h3 className="panel-title">
                                                                    <span>3 .</span> Order History
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="2">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="account-info-wrapper">
                                                                        <h5>Order History</h5>
                                                                    </div>
                                                                    <PerfectScrollbar style={{
                                                                        position: 'relative',
                                                                        maxHeight: '50vmin',
                                                                        overflowY: 'auto'
                                                                    }}>
                                                                        <table className="table table-hover">
                                                                            <thead>
                                                                            <tr>
                                                                                <th scope="col">Order ID</th>
                                                                                <th scope="col">Date</th>
                                                                                <th scope="col">Status</th>
                                                                                <th scope="col">Total</th>
                                                                                <th scope="col">Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            {dashboard.allOrders.length > 0 ? dashboard.allOrders.map((order, index) =>
                                                                                    <tr key={index}>
                                                                                        <td>{order.id}</td>
                                                                                        <td>{order.date}</td>
                                                                                        <td>{order.status === '0' ? <span
                                                                                                className="badge badge-danger">Cancelled</span>
                                                                                            : order.status === '1' ? <span
                                                                                                    className="badge badge-dark">Pending</span>
                                                                                                : order.status === '2' ?
                                                                                                    <span
                                                                                                        className="badge badge-primary">Verified</span>
                                                                                                    : order.status === '3' ?
                                                                                                        <span
                                                                                                            className="badge badge-info">In Progress</span>
                                                                                                        : order.status === '4' ?
                                                                                                            <span
                                                                                                                className="badge badge-secondary">In Delivery</span>
                                                                                                            : order.status === '5' ?
                                                                                                                <span
                                                                                                                    className="badge badge-success">Delivered</span>
                                                                                                                : ''}</td>
                                                                                        <td>{order.totalAmount} for {order.items.length} item</td>
                                                                                        <td>
                                                                                            <button onClick={() => ModalData(order)}
                                                                                               className="btn btn-outline-success btn-sm mr-1">View</button>
                                                                                            <button onClick={() => CancelOrder(order.id, order.status)}
                                                                                               className="btn btn-outline-danger btn-sm">Cancel</button>
                                                                                        </td>
                                                                                    </tr>
                                                                                ) :
                                                                                <tr>
                                                                                    <td colSpan={5}
                                                                                        style={{alignContent: 'center'}}>No
                                                                                        Order Found
                                                                                    </td>
                                                                                </tr>
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    </PerfectScrollbar>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="3">
                                                                <h3 className="panel-title">
                                                                    <span>4 .</span> Change your password
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="3">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="account-info-wrapper">
                                                                        <h5>Change Password</h5>
                                                                    </div>
                                                                    <Formik
                                                                        initialValues={{
                                                                            user_id: userdata.id,
                                                                            old_password: "",
                                                                            new_password: "",
                                                                            confirm_new_password: "",
                                                                        }}
                                                                        onSubmit={resetSubmit}
                                                                        validationSchema={Yup.object().shape({
                                                                            old_password: Yup.string()
                                                                                .required("required")
                                                                                .min(7, " too short - should be 8 chars minimum."),
                                                                            new_password: Yup.string()
                                                                                .required("required.")
                                                                                .min(7, " too short - should be 8 chars minimum."),

                                                                            confirm_new_password: Yup.string().oneOf(
                                                                                [Yup.ref("new_password"), null],
                                                                                "does not match"
                                                                            ),
                                                                        })}
                                                                    >
                                                                        {({errors, touched, handleSubmit}) => (
                                                                            <form onSubmit={handleSubmit}>
                                                                                <div className="row billing-info">
                                                                                    <div
                                                                                        className="form-group col-md-12">
                                                                                        <label>Current Password <span
                                                                                            className="required">*</span></label>
                                                                                        <Field className="form-control"
                                                                                               name="old_password"
                                                                                               autoComplete="password"
                                                                                               placeholder="current password"
                                                                                               id="password"
                                                                                               type="password"/>
                                                                                        {touched.old_password &&
                                                                                        errors.old_password &&
                                                                                        <p className="text-danger mt-1">{"Current password is " + errors.old_password}</p>
                                                                                        }
                                                                                        {Error? <p className="text-danger mt-1">{Error}</p> :''}
                                                                                    </div>
                                                                                    <div
                                                                                        className="form-group col-md-12">
                                                                                        <label>New Password <span
                                                                                            className="required">*</span></label>
                                                                                        <Field className="form-control"
                                                                                               name="new_password"
                                                                                               type="password"
                                                                                               placeholder="new password"/>
                                                                                        {touched.new_password &&
                                                                                        errors.new_password &&
                                                                                        <p className="text-danger mt-1">{"New password is " + errors.new_password}</p>
                                                                                        }
                                                                                    </div>
                                                                                    <div
                                                                                        className="form-group col-md-12">
                                                                                        <label>Confirm New
                                                                                            Password <span
                                                                                                className="required">*</span></label>
                                                                                        <Field className="form-control"
                                                                                               name="confirm_new_password"
                                                                                               type="password"
                                                                                               placeholder="confirm new password"/>
                                                                                        {touched.confirm_new_password &&
                                                                                        errors.confirm_new_password &&
                                                                                        <p className="text-danger mt-1">{"Confirm new password " + errors.confirm_new_password}</p>
                                                                                        }
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <button type="submit"
                                                                                                className="btn btn-fill-out"
                                                                                                name="submit">
                                                                                            {resetState ?
                                                                                                <i className="fas fa-spinner fa-spin"/> : ''}Reset
                                                                                            Password
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        )}
                                                                    </Formik>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="4">
                                                                <h3 className="panel-title">
                                                                    <span>5 .</span> Modify your address book
                                                                    entries{" "}
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="4">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="account-info-wrapper">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-md-6 d-flex align-items-center justify-content-start">
                                                                                <h4>Address Book Entries</h4>
                                                                            </div>
                                                                            <div
                                                                                className="col-md-6 d-flex align-items-center justify-content-end">
                                                                                <button
                                                                                    className="btn btn-sm btn-success "
                                                                                    onClick={() => setAddress(true)}>
                                                                                    {dashboard.addresses.address1 != null && dashboard.addresses.address2 != null ? 'Edit Address' : 'Add Address'}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    {address ?
                                                                        <>
                                                                            <Formik
                                                                                initialValues={{
                                                                                    user_id: userdata.id,
                                                                                    address_line1: dashboard.addresses.address1 != null ? dashboard.addresses.address1[0] : "",
                                                                                    city1: dashboard.addresses.address1 != null ? dashboard.addresses.address1[1] : "",
                                                                                    state1: dashboard.addresses.address1 != null ? dashboard.addresses.address1[2] : "",
                                                                                    zip1: dashboard.addresses.address1 != null ? dashboard.addresses.address1[3] : "",
                                                                                    check: false,
                                                                                    address_line2: dashboard.addresses.address2 != null ? dashboard.addresses.address2[0] : "",
                                                                                    city2: dashboard.addresses.address2 != null ? dashboard.addresses.address2[1] : "",
                                                                                    state2: dashboard.addresses.address2 != null ? dashboard.addresses.address2[2] : "",
                                                                                    zip2: dashboard.addresses.address2 != null ? dashboard.addresses.address2[3] : "",
                                                                                }}
                                                                                onSubmit={addressPost}
                                                                                validationSchema={
                                                                                    Yup.object().shape({
                                                                                        address_line1: Yup.string()
                                                                                            .required("Billing address is required"),
                                                                                        city1: Yup.string()
                                                                                            .required("Billing city is required"),
                                                                                        state1: Yup.string()
                                                                                            .required("Billing state is required"),
                                                                                        zip1: Yup.string()
                                                                                            .required("Billing zip/postal code is required"),
                                                                                        check: Yup.boolean(),
                                                                                        address_line2: Yup.string().when('check', {
                                                                                            is: false,
                                                                                            then: Yup.string().required("Shipping address is required"),
                                                                                            otherwise: Yup.string()
                                                                                        }),
                                                                                        city2: Yup.string().when('check', {
                                                                                            is: false,
                                                                                            then: Yup.string().required("Shipping city is required"),
                                                                                            otherwise: Yup.string()
                                                                                        }),
                                                                                        state2: Yup.string().when('check', {
                                                                                            is: false,
                                                                                            then: Yup.string().required("Shipping state is required"),
                                                                                            otherwise: Yup.string()
                                                                                        }),
                                                                                        zip2: Yup.string().when('check', {
                                                                                            is: false,
                                                                                            then: Yup.string().required("Shipping zip/postal code is required"),
                                                                                            otherwise: Yup.string()
                                                                                        }),

                                                                                    })
                                                                                }
                                                                            >
                                                                                {({errors, touched, values, handleSubmit}) => (
                                                                                    <form onSubmit={handleSubmit}>
                                                                                        <div className="row">
                                                                                            <div
                                                                                                className="form-group col-md-5">
                                                                                                <label>Billing
                                                                                                    Address<span
                                                                                                        className="required">*</span></label>
                                                                                                <Field
                                                                                                    className="form-control"
                                                                                                    name="address_line1"
                                                                                                    placeholder="billing address"
                                                                                                    type="text"/>
                                                                                                {touched.address_line1 && errors.address_line1 &&
                                                                                                <p className="text-danger mt-3">{errors.address_line1}</p>}
                                                                                            </div>
                                                                                            <div
                                                                                                className="form-group col-md-2">
                                                                                                <label>City<span
                                                                                                    className="required">*</span></label>
                                                                                                <Field
                                                                                                    className="form-control"
                                                                                                    name="city1"
                                                                                                    placeholder="city"
                                                                                                    type="text"/>
                                                                                                {touched.city1 && errors.city1 &&
                                                                                                <p className="text-danger mt-3">{errors.city1}</p>}
                                                                                            </div>
                                                                                            <div
                                                                                                className="form-group col-md-2">
                                                                                                <label>State<span
                                                                                                    className="required">*</span></label>
                                                                                                <Field
                                                                                                    className="form-control"
                                                                                                    name="state1"
                                                                                                    placeholder="state"
                                                                                                    type="text"/>
                                                                                                {touched.state1 && errors.state1 &&
                                                                                                <p className="text-danger mt-3">{errors.state1}</p>}
                                                                                            </div>
                                                                                            <div
                                                                                                className="form-group col-md-3">
                                                                                                <label>Zip/Postal
                                                                                                    Code<span
                                                                                                        className="required">*</span></label>
                                                                                                <Field
                                                                                                    className="form-control"
                                                                                                    name="zip1"
                                                                                                    placeholder="zip/postal code"
                                                                                                    type="text"/>
                                                                                                {touched.zip1 && errors.zip1 &&
                                                                                                <p className="text-danger mt-3">{errors.zip1}</p>}
                                                                                            </div>
                                                                                        </div>

                                                                                        <div className="row">
                                                                                            <div className="col-md-12 mt-1 mb-3">
                                                                                                <div className="button-box">
                                                                                                    <div className="login-toggle-btn">
                                                                                                        <Field
                                                                                                            type="checkbox"
                                                                                                            name="check"
                                                                                                            checked={values.check}
                                                                                                        />
                                                                                                        <label className="ml-10"> {" "} Shipping
                                                                                                            Address Same
                                                                                                            as Billing
                                                                                                            Address</label>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        {!values.check ?
                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="form-group col-md-5">
                                                                                                    <label>Shipping
                                                                                                        Address<span
                                                                                                            className="required">*</span></label>
                                                                                                    <Field
                                                                                                        className="form-control"
                                                                                                        name="address_line2"
                                                                                                        placeholder="billing address"
                                                                                                        type="text"/>
                                                                                                    {touched.address_line2 && errors.address_line2 &&
                                                                                                    <p className="text-danger mt-3">{errors.address_line2}</p>}
                                                                                                </div>
                                                                                                <div
                                                                                                    className="form-group col-md-2">
                                                                                                    <label>City<span
                                                                                                        className="required">*</span></label>
                                                                                                    <Field
                                                                                                        className="form-control"
                                                                                                        name="city2"
                                                                                                        placeholder="city"
                                                                                                        type="text"/>
                                                                                                    {touched.city2 && errors.city2 &&
                                                                                                    <p className="text-danger mt-3">{errors.city2}</p>}
                                                                                                </div>
                                                                                                <div
                                                                                                    className="form-group col-md-2">
                                                                                                    <label>State<span
                                                                                                        className="required">*</span></label>
                                                                                                    <Field
                                                                                                        className="form-control"
                                                                                                        name="state2"
                                                                                                        placeholder="state"
                                                                                                        type="text"/>
                                                                                                    {touched.state2 && errors.state2 &&
                                                                                                    <p className="text-danger mt-3">{errors.state2}</p>}
                                                                                                </div>
                                                                                                <div
                                                                                                    className="form-group col-md-3">
                                                                                                    <label>Zip/Postal
                                                                                                        Code<span
                                                                                                            className="required">*</span></label>
                                                                                                    <Field
                                                                                                        className="form-control"
                                                                                                        name="zip2"
                                                                                                        placeholder="zip/postal code"
                                                                                                        type="text"/>
                                                                                                    {touched.zip2 && errors.zip2 &&
                                                                                                    <p className="text-danger mt-3">{errors.zip2}</p>}
                                                                                                </div>
                                                                                            </div> : ''}
                                                                                        <button type="submit"
                                                                                                className="btn btn-primary mb-3 mr-1">
                                                                                            Save
                                                                                        </button>
                                                                                        <button
                                                                                            className="btn btn-danger mb-3"
                                                                                            onClick={cancelAddress}>Cancel
                                                                                        </button>
                                                                                    </form>
                                                                                )}</Formik>

                                                                        </>
                                                                        :
                                                                        <>
                                                                            {dashboard.addresses.address1 != null && dashboard.addresses.address2 != null ?
                                                                                <div className="entries-wrapper">
                                                                                    <div className="row">
                                                                                        <div
                                                                                            className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                                                                            <div
                                                                                                className="entries-info text-center">
                                                                                                <h4><b>Billing
                                                                                                    Address</b></h4>
                                                                                                <address>
                                                                                                    {dashboard.addresses.address1[0] +
                                                                                                    ', ' + dashboard.addresses.address1[1] +
                                                                                                    ', ' + dashboard.addresses.address1[2] +
                                                                                                    ', ' + dashboard.addresses.address1[3]}
                                                                                                </address>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                                                                            <div
                                                                                                className="entries-info text-center">
                                                                                                <h4><b>Shipping
                                                                                                    Address</b>
                                                                                                </h4>

                                                                                                <address>{dashboard.addresses.address2[0] + ', ' + dashboard.addresses.address2[1] + ', ' + dashboard.addresses.address2[2] + ', ' + dashboard.addresses.address2[3]}</address>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div className="entries-wrapper">
                                                                                    <div className="row">
                                                                                        <div className="col-md-12">
                                                                                            <address>No Address Found
                                                                                            </address>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    }
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                    <Card className="single-my-account mb-20">
                                                        <Card.Header className="panel-heading">
                                                            <Accordion.Toggle variant="link" eventKey="5">
                                                                <h3 className="panel-title">
                                                                    <span>6 .</span> Logout{" "}
                                                                </h3>
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="5">
                                                            <Card.Body>
                                                                <div className="myaccount-info-wrapper">
                                                                    <div className="billing-back-btn">
                                                                        <div className="billing-btn">
                                                                            <button onClick={handleLogout}
                                                                                    type="submit">Logout
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </> : ''}
                    </>

                </div>
            </LayoutOne>
        </Fragment>
    );
};

MyAccount.propTypes = {
    location: PropTypes.object
};

export default MyAccount;
