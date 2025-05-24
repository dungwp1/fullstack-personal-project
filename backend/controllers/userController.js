import userService from '../services/userServices.js';

let getAllUsers = async (req, res) => {
    let users = await userService.getAllUser();
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all user ok',
        users,
    });
};

let createNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}   

export default {
    getAllUsers,
    createNewUser,
};