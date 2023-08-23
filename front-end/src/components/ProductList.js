import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";

const ProductList=()=>{

    const [product, setProduct] = React.useState([]);

   useEffect(()=>{
     getProduct();
    },[])
   const getProduct = async ()=>{
      let products = await fetch("http://localhost:5000/products",{
        headers:{
            authorization :JSON.parse(localStorage.getItem('token'))
        }
      })
     products = await products.json();
     console.log(products);
     setProduct(products);
   }
   
   const searchProducts = async (event)=>{
      let key = event.target.value;
       if (key) {
           let result = await fetch(`http://localhost:5000/search/${event.target.value}`);
           result = await result.json();
           if (result) {
               setProduct(result);
           }
       } else {
           getProduct();
       }

   }

   const deleteProduct= async(id)=>{
     let result = await fetch(`http://localhost:5000/products/${id}`,{
        method:'Delete'
     });
     result = result.json();
     if(result)
     {
        getProduct();
     }
   }
    return(
        <div class="Product-list">
            <input class="search" placeholder="Search Product...." onChange={searchProducts} />
            <h3>ProductList</h3>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                product.length>0 ? product.map((item,index)=>
                    <ul>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                         <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
               ):<h1>No result found</h1>
          
            }
        </div>
       
    );
}

export default ProductList;