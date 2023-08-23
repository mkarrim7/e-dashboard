const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const JWT = require('jsonwebtoken');
const jwtkey = 'e-comm';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    JWT.sign({result},jwtkey,{expiresIn:"2h"},(error,token)=>{
        if (error) {
            res.send({ result: "Something went wrong" });
        }
        res.send({ result, auth: token });
    })
})


app.post("/login", async (req, res) => {
    // console.log("1999", req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user){
            JWT.sign({user},jwtkey,{expiresIn:"2h"},(error,token)=>{
                if (error) {
                    res.send({ result: "Something went wrong" });
                }
                res.send({ user, auth: token });
            })
        }
        else
            res.send({ result: "user not found" });
    }
    else {
        res.send({ result: "user not found" });
    }
})

app.post("/addProduct",verifyToken,async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    console.log(result);
    res.send(result);
})

app.get("/products",verifyToken,async (req,res)=>{
    let product = await Product.find();
    if(product.length>0)
    {
        res.send(product);
    }
    else
    {
        res.send({"result":"No product found"});
    }
})

app.delete("/products/:id",verifyToken,async (req,res)=>{
   let result = await Product.deleteOne({_id:req.params.id});
   res.send(result);
})

app.get("/products/:id",verifyToken,async (req,res)=>{
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "Not found" });
    }
})

app.put("/product/:id",verifyToken,async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result);
})

app.get("/search/:key",verifyToken,async (req,res)=>{
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    })

    res.send(result);

})
app.listen(5000, () => {
    console.log("app is running on port 5000");
});

function verifyToken(req,res,next)
{
    console.log(req.headers['authorization']);
    let token = req.headers['authorization'];
    if(token)
    {
      JWT.verify(token,jwtkey,(err,valid)=>{
         if(err)
         {
            res.status(403).send({"result":"Please provide a valid token"});
         }
         else{
            next();
         }
      })
    }else{
      res.status(403).send({"result":"Please provide a token"})
    }
 
}