import express from "express";
import deviceController from "../controllers/deviceController.js";

let router = express.Router();

router.get('/get-all-devices', deviceController.getAllDevices);
router.get('/get-device-by-id/:id', deviceController.getDeviceByBrandId);

export default router;