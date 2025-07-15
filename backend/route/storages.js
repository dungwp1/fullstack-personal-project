import express from "express";
import storageController from "../controllers/storageController.js";

let router = express.Router();

router.get('/get-all-storages', storageController.getAllStorages);

export default router;