const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/api/products", productController.getProducts);
router.get("/api/products/:id", productController.getProductById);
router.post("/api/products", productController.addProducts);
router.delete("/api/products/:id", productController.deleteProduct);

module.exports = router;
