import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ()=>{
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState("");
    let navigate = useNavigate();
    let userId = JSON.parse(localStorage.getItem("user"))._id;

    const collectData =async ()=>{
        if(!name || !price || !category || !company )
        {
            setError(true);
            return false;
        }
        let result = await fetch('http://localhost:5000/addProduct',{
            method:'post',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                'Content-type':'application/json'
            }
        });

        result = await result.json();
        if (result) {
            localStorage.setItem("product", JSON.stringify(result));
            navigate('/');
        } 
    }
    return(
        <div class="AddProduct">
            <h1>LOGIN</h1>
            <input class="inputBox" placeholder="Enter Name of the Product" value={name} onChange={(e) => setName(e.target.value)} />
            {error && !name && <span class="InvalidError">Enter Valid Name</span>}
            <input class="inputBox" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            {error && !price && <span class="InvalidError">Enter Valid Price</span>}
            <input class="inputBox" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            {error && !category && <span class="InvalidError">Enter Valid Category</span>}
            <input class="inputBox" placeholder="Enter Company" value={company} onChange={(e) => setCompany(e.target.value)} />
            {error && !company && <span class="InvalidError">Enter Valid company</span>}
            <button class="appButton" onClick={collectData}>submit</button>
        </div>
    );

}

export default AddProduct;


// name:String,
// price:String,
// category:String,
// userId:String,
// company:String