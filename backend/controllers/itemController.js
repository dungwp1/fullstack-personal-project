import itemService from '../services/itemService.js';

let getAllItems = async (req, res) => {
    try {
        let data = await itemService.getAllItems();
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Get all items successful',
            data,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            errMessage: error.message || 'Internal server error',
        });
    }
};

let createItem = async (req, res) => {
    try {
        const data = req.body;
        const images = req.files;
        console.log('Received data:', data);
        console.log('Received images:', images);
        const item = await itemService.createItem(data, images);
        res.status(201).json({ message: 'Item created', data: item });
    } catch (error) {
        console.error('Create item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
let getItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await itemService.getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ data: item });
    } catch (error) {
        console.error('Get item by ID error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    getAllItems,
    createItem,
    getItemById
};