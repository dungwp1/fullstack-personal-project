import storageService from '../services/storageService.js';

let getAllStorages = async (req, res) => {
    let data = await storageService.getAllStorages();
    console.log(data);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'get all storages ok',
        data,
    });
};

export default {
    getAllStorages
};      