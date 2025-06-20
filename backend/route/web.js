import userRoutes from './users.js';
import categoryRoutes from './catergories.js';
import express from 'express';

const initWebRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/categories', categoryRoutes);

};

export default initWebRoutes;
