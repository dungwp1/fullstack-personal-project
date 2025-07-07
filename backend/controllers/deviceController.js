import deviceService from '../services/deviceService.js';

let getAllDevices = async (req, res) => {
    try {
        let data = await deviceService.getAllDevices();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get all devices successful',
            data,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMessage: error.message || 'Internal server error',
        });
    }
};

let getDeviceByBrandId = async (req, res) => {
    let brandId = req.params.id;
    if (!brandId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameter: id',
        });
    }

    try {
        let data = await deviceService.getDeviceByBrandId(brandId);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get devices by ID successful',
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
    getAllDevices,
    getDeviceByBrandId
};