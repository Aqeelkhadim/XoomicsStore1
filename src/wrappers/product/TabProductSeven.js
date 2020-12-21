import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGridTwo from "./ProductGridTwo";
import {connect} from "react-redux";

const TabProductSeven = ({
                             spaceBottomClass,
                             containerClass,
                             extraClass,
                             specialProducts
                         }) => {
    return (
        <div
            className={`product-area ${spaceBottomClass ? spaceBottomClass : ""} ${
                extraClass ? extraClass : ""
            }`}
        >
            <div className={`${containerClass ? containerClass : "container"}`}>
                <SectionTitle titleText="DAILY DEALS!" positionClass="text-center"/>
                <Tab.Container defaultActiveKey="all">
                    <Nav
                        variant="pills"
                        className="product-tab-list pt-30 pb-55 text-center"
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="all">
                                <h4>All </h4>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="special">
                                <h4>Special Offers</h4>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="sold">
                                <h4>Most Sold Products</h4>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        {specialProducts[0] &&
                        Object.keys(specialProducts[0]).map((type) => (
                        <Tab.Pane eventKey={type} key={type}>
                            <div className="row">
                                <ProductGridTwo
                                    products={specialProducts[0][type]}
                                    type="new"
                                    limit={8}
                                    spaceBottomClass="mb-25"
                                />
                            </div>
                        </Tab.Pane>
                        ))}
                    </Tab.Content>
                </Tab.Container>
                <div className="view-more text-center mt-20 toggle-btn6 col-12">
                    <Link
                        className="loadMore6"
                        to={process.env.PUBLIC_URL + "/products"}
                    >
                        VIEW MORE PRODUCTS
                    </Link>
                </div>
            </div>
        </div>
    );
};

TabProductSeven.propTypes = {
    containerClass: PropTypes.string,
    extraClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    specialProducts: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        specialProducts: state.specialProducts,
    };
};

export default connect(mapStateToProps)(TabProductSeven);
// export default TabProductSeven;
