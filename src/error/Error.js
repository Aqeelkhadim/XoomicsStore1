import React from "react";
import "./error.css";

const Error =({ error })=> {
    return <div className="text-red">{error}</div>;
};


export default Error;
