import express from "express";
import productController from "../controllers/productController.js";

let router = express.Router();

router.get('/get-all-product', productController.getAllProducts);
router.get('/get-product-by-id/:id', productController.getProductByBrandId);

export default router;