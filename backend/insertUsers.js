// insertUser.js
const mysql = require('mysql2/promise');
require('dotenv').config();


async function insertUser() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,            // đổi thành host MySQL của bạn
            port: process.env.DB_PORT,            // đổi thành port MySQL của bạn
            user: process.env.DB_USER,            // đổi thành user MySQL của bạn
            password: process.env.DB_PASSWORD,  // đổi thành password MySQL của bạn
            database: process.env.DB_NAME   // đổi thành tên database của bạn
        });

        const [exist] = await connection.execute(
            'SELECT id FROM users WHERE username = ?',
            ['tk4']
        );
        if (exist.length > 0) {
            console.log('❌ Username đã tồn tại!');
        } else {
            const [result] = await connection.execute(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                ['tk4', 'pass123']
            );
            console.log('✅ Đã thêm user với ID:', result.insertId);
        }

        const [rows] = await connection.execute('SELECT * FROM users');

        // Log ra console dữ liệu lấy được
        console.log(rows);

        await connection.end();
    } catch (err) {
        console.error('❌ Lỗi khi thêm dữ liệu:', err);
    }
}

insertUser();
