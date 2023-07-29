const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})

app.post("/login", async (req, res) => {
    // console.log("1999", req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user)
            res.send(user);
        else
            res.send({ result: "user not found" });
    }
    else {
        res.send({ result: "user not found" });
    }
})

app.post("/add-product",async (req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    console.log(result);
    res.send(result);
})
app.listen(5000, () => {
    console.log("app is running on port 5000");
});