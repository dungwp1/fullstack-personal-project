import userRoutes from './users.js';
import categoryRoutes from './catergories.js';
import brandRoutes from './brands.js';
import deviceRouters from './devices.js';
import itemRouters from './items.js';
import express from 'express';

const initWebRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/brands', brandRoutes);
    app.use('/api/devices', deviceRouters);
    app.use('/api/items', itemRouters);
};

export default initWebRoutes;
