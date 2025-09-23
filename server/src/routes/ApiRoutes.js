const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/api/products", productController.test);

module.exports = router;
