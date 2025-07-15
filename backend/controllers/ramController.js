import ramService from '../services/ramService.js';

let getAllRam = async (req, res) => {
    let data = await ramService.getAllRam();
    console.log(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all ram ok',
        data,
    });
};

export default {
    getAllRam
};  