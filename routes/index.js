const express = require("express")
const router  = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

router.get('/' ,(req,res) =>{
               let error = req.flash("error")
               res.render("index" , {error, loggedin:false})
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    // console.log("thisis producttt",products);
    let success = req.flash("success")
    res.render("shop", { products,success }); 
  } catch (error) {
    console.error("Error loading shop page:", error);
    res.status(500).send("Error loading products");
  }
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  // console.log("this is userrr", req.user);
  const user = await userModel.findOne({email : req.user.email})
  console.log("this is prductid" ,req.params.productid );
  
  
   user.cart.push(req.params.productid);
   await user.save()
   req.flash("success" , "Added to the card")
   res.redirect("/shop")
});



router.get("/cart", isLoggedIn, async (req, res) => {
   const user = await userModel.findOne({email:req.user.email}).populate("cart")
  //  console.log("cart data",user.cart);
   
 res.render('cart' , {user})
});


module.exports = router       