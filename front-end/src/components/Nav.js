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
   <div class="nav-header">{
     auth ? <ul>
       <li><Link to="/">Product</Link></li>
       <li><Link to="/add">Add Product</Link></li>
       <li><Link to="/update">Update Product</Link></li>
       <li><Link to="/profile">Profile</Link></li>
       <li><Link to="/signUp" onClick={userLogout}>Logout({JSON.parse(auth).name})</Link></li>
     </ul>:<ul class="nav-right">
       <li><Link to="/signUp">SignUp</Link></li>
       <li><Link to="/login">Login</Link></li>
     </ul>
     }
   </div>
 );
}

export default Nav;