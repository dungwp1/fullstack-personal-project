import categoryServices from '../services/categoryServices.js';

let getAllCategories = async (req, res) => {
    let users = await categoryServices.getAllCategories();
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all categories ok',
        users,
    });
};

export default {
    getAllCategories
};