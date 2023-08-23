import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";


const UpdateProduct = ()=>{
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        preFill();
       },[])

    const preFill = async()=>{
        let prefilProduct = await fetch(`http://localhost:5000/products/${params.id}`); 
        prefilProduct = await prefilProduct.json();
       setName(prefilProduct.name);
       setPrice(prefilProduct.price);
       setCategory(prefilProduct.category);
       setCompany(prefilProduct.company);

    }

    const updateData =async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-type': 'application/json'
            }
      })
          result = await result.json();
          if(result)
          {
            navigate("/");
          }
          else{
            console.log("failed....");
          }
    }
    return(
        <div class="AddProduct">
            <h1>Update</h1>
            
                <input class="inputBox" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />

                <input class="inputBox" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
    
                <input class="inputBox" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
    
                <input class="inputBox" placeholder="Enter Company" value={company} onChange={(e) => setCompany(e.target.value)} />
    
                <button class="appButton" onClick={updateData}>Update Product</button>
        </div>
    );

}

export default UpdateProduct;

