import colorService from '../services/colorService.js';

let getAllColors = async (req, res) => {
    let data = await colorService.getAllColors();
    console.log(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all colors ok',
        data,
    });
};

export default {
    getAllColors
};  