import express from "express";
import ramController from "../controllers/ramController.js";

let router = express.Router();

router.get('/get-all-ram', ramController.getAllRam);

export default router;