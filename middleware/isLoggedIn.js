const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decoded.user }).select("-password");
    console.log(user);
    
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "something ssssswent wrong.");
    res.redirect("/");
  }
};

// try {
//   let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
//   console.log("decoded token is:", decoded); 
//   let user = await userModel.findOne({ email: decoded.user }).select("-password");

//   if (!user) {
//     console.log("No user found with decoded email:", decoded.email);
//     req.flash("error", "User not found");
//     return res.redirect("/");
//   }

//   req.user = user;
//   next();
// } catch (error) {
//   console.error("JWT verification failed:", error);
//   req.flash("error", "Session expired. Please log in again.");
//   res.redirect("/");
// }
