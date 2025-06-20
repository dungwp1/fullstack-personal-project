import express from "express";
import categoryController from "../controllers/categoryController.js";

let router = express.Router();

router.get('/get-all-categories', categoryController.getAllCategories);

export default router;