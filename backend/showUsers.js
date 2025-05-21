// showUsers.js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function showUsers() {
    try {
        // Kết nối DB MySQL
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,            // đổi thành host MySQL của bạn
            port: process.env.DB_PORT,            // đổi thành port MySQL của bạn
            user: process.env.DB_USER,            // đổi thành user MySQL của bạn
            password: process.env.DB_PASSWORD,  // đổi thành password MySQL của bạn
            database: process.env.DB_NAME   // đổi thành tên database của bạn
        });

        // Thực thi câu lệnh SELECT lấy dữ liệu bảng users
        const [rows] = await connection.execute('SELECT * FROM users');

        // Log ra console dữ liệu lấy được
        console.log(rows);

        // Đóng kết nối
        await connection.end();
    } catch (error) {
        console.error('Lỗi kết nối hoặc truy vấn DB:', error);
    }
}

// Gọi hàm
showUsers();
