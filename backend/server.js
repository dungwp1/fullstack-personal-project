const express = require('express');
const app = express();
const PORT = 5000;
require('dotenv').config();

const mysql = require('mysql2/promise');
const cors = require('cors');
app.use(cors()); // Cho phép frontend truy cập API
app.use(express.json());
// Tạo route GET /api/users
app.get('/api/users', async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,            // đổi thành host MySQL của bạn
            port: process.env.DB_PORT,            // đổi thành port MySQL của bạn
            user: process.env.DB_USER,            // đổi thành user MySQL của bạn
            password: process.env.DB_PASSWORD,  // đổi thành password MySQL của bạn
            database: process.env.DB_NAME   // đổi thành tên database của bạn
        });

        const [rows] = await connection.execute('SELECT * FROM users');
        await connection.end();
        res.json(rows); // Trả dữ liệu dạng JSON
    } catch (error) {
        console.error('❌ Lỗi khi lấy dữ liệu:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
