import userRoutes from './users.js';
import categoryRoutes from './catergories.js';
import brandRoutes from './brands.js';
import productRoutes from './products.js';
import express from 'express';

const initWebRoutes = (app) => {
    app.use('/api/users', userRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/brands', brandRoutes);
    app.use('/api/products', productRoutes);
};

export default initWebRoutes;
