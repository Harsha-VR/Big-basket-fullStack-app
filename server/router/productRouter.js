const express = require("express");
const Product = require("../models/product");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// @usage : get all products
// @url : http//:127.0.0.1/api/products
// @fields : no fields
// @method : get
// access : public

router.get("/products", async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).json({ product: product });
  } catch(error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

// @usage : get a product
// @url : http//:127.0.0.1/api/products/:product_id
// @fields : no fields
// @method : get
// access : public

router.get("/products/:product_id", async (req, res) => {
  let productId = req.params.product_id;
  try {
    let product = await Product.findById(productId);
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

// @usage : create products
// @url : http//:127.0.0.1/api/products/
// @fields : name , image ,price ,qty ,info
// @method : post
// access : public

router.post(
  "/products",
  [
    body("name").notEmpty().withMessage("name is required"),
    body("image").notEmpty().withMessage("image is required"),
    body("price").notEmpty().withMessage("price is required"),
    body("qty").notEmpty().withMessage("qty is required"),
    body("info").notEmpty().withMessage("info is required"),
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.json({ msg: "create a product" })
    try {
      let product = {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        qty: req.body.qty,
        info: req.body.info,
      };
      product = new Product(product);
      product = await product.save();
      res.status(200).json({
        msg: "product is created",
        product: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

// @usage : update products
// @url : http//:127.0.0.1/api/products/:product_id
// @fields : name , image ,price ,qty ,info
// @method : put
// access : public

router.put("/products/:product_id", async (req, res) => {
  let productId = req.params.product_id;
  try {
    let product = await Product.findById(productId);
    if (!product) {
      res.status(200).json({ error: [{ msg: "product not found" }] });
    }
    let updatedProduct = {
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      qty: req.body.qty,
      info: req.body.info,
    };
    product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: updatedProduct,
      },
      { new: true }
    );
    res.status(200).json({ msg: "product is updated", product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: [{ msg: error.message }] });
  }
});

// @usage : delete products
// @url : http//:127.0.0.1/api/products/:product_id
// @fields : no fields
// @method : delete
// access : public

router.delete("/products/:product_id", async (req, res) => {
  let productId = req.params.product_id;
  try {
    let product = await Product.findById(productId);
    if (!product) {
      res.status(200).res({ error: [{ msg: "product not found" }] });
    }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ msg: "product is deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: [{ msg: error.message }] }); 
  }
});

module.exports = router;
