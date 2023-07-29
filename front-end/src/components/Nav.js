import React from "react";
import { useNavigate,Link } from "react-router-dom";

const Nav=()=>{
   let auth = localStorage.getItem("user");
   let navigate = useNavigate();
   let userLogout=()=>{
     localStorage.removeItem("user");
     navigate('/signUp');
   }
 return(
    <div class="nav-header">
     <ul>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {
          auth?<li><Link to="/signUp" onClick={userLogout}>Logout</Link></li>:
          <>
          <li><Link to="/signUp">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
          </>
        }
        <li></li>
     </ul>
    </div>
 );
}

export default Nav;