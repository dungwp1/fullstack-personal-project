import categoryService from '../services/categoryService.js';

let getAllCategories = async (req, res) => {
    let data = await categoryService.getAllCategories();
    console.log(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all categories ok',
        data,
    });
};

export default {
    getAllCategories
};