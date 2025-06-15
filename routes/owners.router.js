const express = require("express");
const ownerModel = require("../models/owner.model");
const router = express("router");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(500)
        .send("you dont have the permisson to access this page ");
    }

    let { fullname, email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        console.log("this is hash password hash", hash);
        const createdOwner = await ownerModel.create({
          fullname,
          email,
          password: hash,
        });
        console.log(createdOwner);
        res.status(202).send(createdOwner);
      });
    });
  });
}

router.get("/admin", function (req, res) {
    const success = req.flash('success');
  res.render('createproducts', { success });
});



module.exports = router;
