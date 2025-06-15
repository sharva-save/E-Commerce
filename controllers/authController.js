const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/genrateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(401)
        .send("user with the same email exist please login");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        let user = await userModel.create({
          email,
          password: hash,
          fullname,
        });
        console.log(user);

        //token store start
        let token = generateToken(user);
        console.log(token);

        res.cookie("token", token);
        //token store end

        return res.status(201).send("your created successfully");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!(email || password)) {
    return res.redirect("/");
  }
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(501).send("email is not exist missing");
  }
  bcrypt.compare(password, user.password, function (err, result) {
    if(result === true){
     const token =  generateToken(user)
     res.cookie("token" , token)
      return res.redirect("/shop")
    }
     else{
      return res.redirect("/")
    }
    
  });
};

module.exports.logOut = function(req,res) {
  res.cookie("token" ,"")
  res.redirect("/")
}

