import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              Home
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/products"}>
              {" "}
              Menu
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/about-us"}>
              {" "}
              About Us
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact-us"}>
              Contact us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default multilanguage(NavMenu);
