const express = require("express");

const {
  registerUser,
  loginUser,
  logOut,
} = require("../controllers/authController");

const router = express("router");

router.get("/", function (req, res) {
  res.send("heyy");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logOut);

module.exports = router;
