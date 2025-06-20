import express from "express";
import brandController from "../controllers/brandController.js";

let router = express.Router();

router.get('/get-all-brands', brandController.getAllBrands);
router.get('/get-brand-by-id/:id', brandController.getBrandById);

export default router;