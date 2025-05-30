import express from "express";
import userController from "../controllers/userController.js";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-new-user', userController.createNewUser);
    router.post('/api/login', userController.handleLogin);
    return app.use("/", router);
};

export default initWebRoutes;