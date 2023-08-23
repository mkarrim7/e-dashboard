import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
const SignUp=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user"))
        {
            navigate('/');
        }
    },[])
    const collectData=async ()=>{
        let result = await fetch("http://localhost:5000/register",{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-type':'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/');
    }
    return(
        <div class="register">
            <h1>Register</h1>
            <input class="inputBox" type="text" placeholder="Enter Name" 
            value={name} onChange={(e)=>setName(e.target.value)}/>
            <input class="inputBox" type="text" placeholder="Enter Email"
             value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input class="inputBox" type="password" placeholder="Enter Password" 
             value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={collectData} class="appButton" type="submit">Sign Up</button>
        </div>
    )
};

export default SignUp;