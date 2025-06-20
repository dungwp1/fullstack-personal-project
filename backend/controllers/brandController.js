import brandService from '../services/brandService.js';

let getAllBrands = async (req, res) => {
    try {
        let data = await brandService.getAllBrands();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get all brands successful',
            data,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMessage: error.message || 'Internal server error',
        });
    }
};

let getBrandById = async (req, res) => {
    let categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameter: id',
        });
    }

    try {
        let data = await brandService.getBrandById(categoryId);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get brand by ID successful',
            data,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 2,
            errMessage: error.message || 'Internal server error',
        });
    }
}

export default {
    getAllBrands,
    getBrandById
};