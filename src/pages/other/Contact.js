import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";
import { Formik, Field } from "formik";
import * as axios from "axios";
import swal from "sweetalert";
import * as Yup from "yup";
const Contact = ({ location }) => {
  const { pathname } = location;
  return (
      <Fragment>
        <MetaTags>
          <title>Flone | Contact</title>
          <meta
              name="description"
              content="Contact of flone react minimalist eCommerce template."
          />
        </MetaTags>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
        <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
          Contact
        </BreadcrumbsItem>
        <LayoutOne headerTop="visible">
          {/* breadcrumb */}
          <Breadcrumb />
          <div className="contact-area pt-100 pb-100">
            <div className="container">
              <div className="contact-map mb-10">
                <LocationMap latitude="47.444" longitude="-122.176" />
              </div>
              <div className="custom-row-2">
                <div className="col-lg-4 col-md-5">
                  <div className="contact-info-wrap">
                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-phone" />
                      </div>
                      <div className="contact-info-dec">
                        <p>+012 345 678 102</p>
                        <p>+012 345 678 102</p>
                      </div>
                    </div>
                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-globe" />
                      </div>
                      <div className="contact-info-dec">
                        <p>
                          <a href="mailto:urname@email.com">urname@email.com</a>
                        </p>
                        <p>
                          <a href="//urwebsitenaem.com">urwebsitenaem.com</a>
                        </p>
                      </div>
                    </div>
                    <div className="single-contact-info">
                      <div className="contact-icon">
                        <i className="fa fa-map-marker" />
                      </div>
                      <div className="contact-info-dec">
                        <p>Address goes here, </p>
                        <p>street, Crossroad 123.</p>
                      </div>
                    </div>
                    <div className="contact-social text-center">
                      <h3>Follow Us</h3>
                      <ul>
                        <li>
                          <a href="//facebook.com">
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="//pinterest.com">
                            <i className="fa fa-pinterest-p" />
                          </a>
                        </li>
                        <li>
                          <a href="//thumblr.com">
                            <i className="fa fa-tumblr" />
                          </a>
                        </li>
                        <li>
                          <a href="//vimeo.com">
                            <i className="fa fa-vimeo" />
                          </a>
                        </li>
                        <li>
                          <a href="//twitter.com">
                            <i className="fa fa-twitter" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-7">
                  <div className="contact-form">
                    <div className="contact-title mb-30">
                      <h2>Get In Touch</h2>
                    </div>
                    <Formik
                        initialValues={{
                          email: "",
                          name: "",
                          phone: "",
                          subject: "",
                          message: "",
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().email().required("Email is required"),
                          name: Yup.string().required("Name is required"),
                          subject: Yup.string().required("Subject is required"),
                          message: Yup.string().required("Massage is required"),
                        })}
                        onSubmit={
                          async (values, { setStatus, resetForm }) => {
                            await axios.post(`http://backend.xoomics.com/api/v1/outlet/8/contact-us`, values)
                                .then(response => {
                                  if (response.data) {
                                    swal({
                                      title: "Your Massages Sent!",
                                      text: response.data.name + " your massage received, we will back to you shortly",
                                      icon: "success",
                                      button: false,
                                      timer: 3000,
                                    });
                                    resetForm({})
                                    setStatus({ success: true })
                                  }
                                });
                          }
                        }>
                      {({ errors, touched, handleSubmit }) => (
                          <form className="contact-form-style" onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-lg-6 mb-3">
                                <Field name="name" placeholder="Name*" type="text" />
                                {touched.name && errors.name ?
                                    <div className="text-danger">{errors.name}</div> : null}
                              </div>
                              <div className="col-lg-6 mb-3">
                                <Field name="email" placeholder="Email*" type="email" />
                                {touched.email && errors.email ?
                                    <div className="text-danger">{errors.email}</div> : null}
                              </div>
                              <div className="col-lg-6 mb-3">
                                <Field
                                    name="subject"
                                    placeholder="Subject*"
                                    type="text"
                                />
                                {touched.subject && errors.subject ?
                                    <div className="text-danger" >{errors.subject}</div> : null}
                              </div>
                              <div className="col-lg-6 mb-3">
                                <Field
                                    name="phone"
                                    placeholder="Phone"
                                    type="text"
                                />
                              </div>
                              <div className="col-lg-12 mb-3">
                                <Field
                                    name="message"
                                    placeholder="Your Massege*"
                                    defaultValue={""}
                                    as="textarea"
                                />
                                {touched.message && errors.message ?
                                    <div className="text-danger">{errors.message}</div> : null}
                                <button className="submit" type="submit">
                                  SEND
                                </button>
                              </div>
                            </div>
                          </form>
                      )}
                    </Formik>
                    <p className="form-messege" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutOne>
      </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;