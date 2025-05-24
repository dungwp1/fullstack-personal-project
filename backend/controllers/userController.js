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

export default {
    getAllUsers,
};