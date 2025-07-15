import express from "express";
import colorController from "../controllers/colorController.js";

let router = express.Router();

router.get('/get-all-colors', colorController.getAllColors);

export default router;