import React from "react";
import {Route,Redirect} from "react-router-dom";
import jwtDecode from "jwt-decode";
// import jwtDecode from "jwt-decode";
const GuestRoute=({ component: Component, ...rest }) => {

    const token = localStorage.getItem('access_token');
    let userdata = token ? jwtDecode(token) : {name:''};

    return (
        <Route {...rest}
               render={props =>
                   (!token) ?
                       (
                           <Component {...props} />
                       ) : (
                           <Redirect
                               to={{
                                   pathname:`/profile/${token? userdata.name : ''}`,
                                   state: { from: props.location },
                               }}
                           />
                       )
               }
        />
    );
};
export default GuestRoute;

