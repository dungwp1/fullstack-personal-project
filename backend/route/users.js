import express from "express";
import userController from "../controllers/userController.js";

let router = express.Router();

router.get('/get-all-users', userController.getAllUsers);
router.post('/create-new-user', userController.createNewUser);
router.post('/login', userController.handleLogin);

export default router;