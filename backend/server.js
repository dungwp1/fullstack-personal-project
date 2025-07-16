import cors from 'cors';
import express from 'express';
import initWebRoutes from './route/web.js';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const app = express();
const PORT = 8000;

// Khởi tạo Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // hoặc 'postgres', 'sqlite', v.v.
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

initWebRoutes(app);

// Kiểm tra kết nối database
sequelize.authenticate()
    .then(() => {
        console.log('✅ Kết nối database thành công!');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Kết nối database thất bại:', err);
    });