const upload = require("../config/multer-config");
const productModel = require("../models/product.model");

module.exports.createProduct = async (req, res) => {
  try {
    let { image, name, price, discount, bgcolor, panelcolor, textcolor } =
      req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    console.log("this is product", product);3
    req.flash("success" , "Product Created Successfully")
    res.redirect("/owner/admin");
  } catch (error) {
    res.send("someting wend wrone in the making of the product");
  }
};

