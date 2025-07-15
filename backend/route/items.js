import express from "express";
import itemController from "../controllers/itemController.js";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Lấy đuôi file (VD: .png, .jpg)
        const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

let router = express.Router();

router.get('/get-all-items', itemController.getAllItems);
router.post('/create-item', upload.array('images', 10), itemController.createItem);
router.get('/get-item-by-id/:id', itemController.getItemById);

export default router;
