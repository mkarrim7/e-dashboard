import React from "react";
import { Navigate,Outlet } from "react-router-dom";

const PrivateComponent=()=>{
    let auth= localStorage.getItem("user");
    return auth?<Outlet/>:<Navigate to="signUp" />
}

export default PrivateComponent;