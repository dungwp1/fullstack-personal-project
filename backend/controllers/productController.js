import productService from '../services/productService.js';

let getAllProducts = async (req, res) => {
    try {
        let data = await productService.getAllProducts();
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

let getProductByBrandId = async (req, res) => {
    let brandId = req.params.id;
    if (!brandId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameter: id',
        });
    }

    try {
        let data = await productService.getProductByBrandId(brandId);
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
    getAllProducts,
    getProductByBrandId
};