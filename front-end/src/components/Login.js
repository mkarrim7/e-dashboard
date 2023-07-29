import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router-dom"


const Login=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user"))
        {
            navigate('/');
        }
    },[])
    const userLogin= async ()=>{
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result){
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');
        }
        else
        alert("Invalid Login");
    }
   return(
    <div className="Login">
        <h1>LOGIN</h1>
        <input className="inputBox" placeholder="Enter Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className="inputBox" placeholder="Enter Password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="appButton" onClick={userLogin}>submit</button>
    </div>
   )
}

export default Login;