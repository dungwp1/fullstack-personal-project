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
    try {
        // Lấy dữ liệu từ query thay vì body
        let data = {
            username: req.query.username,
            password: req.query.password
        };
        let result = await userService.createNewUser(data);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ errCode: 1, errMessage: err.message });
    }
};

let handleLogin = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ errCode: 1, errMessage: 'Missing input parameters' });
        }
        let userData = await userService.handleUserLogin(username, password);
        return res.status(200).json(userData);
    } catch (err) {
        return res.status(500).json({ errCode: 1, errMessage: err.message });
    }
};

export default {
    getAllUsers,
    createNewUser,
    handleLogin
};