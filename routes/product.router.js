const express = require("express");

const router = express("router");
const upload = require("../config/multer-config");
// const productModel = require("../models/product.model");
const {createProduct} = require('../controllers/ProductController')

router.post("/create", upload.single("image"), createProduct);

module.exports = router;
