const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/api/test", productController.testBro);
router.get("/api/product", productController.getProducts);

module.exports = router;
