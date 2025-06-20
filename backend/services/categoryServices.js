import mysql from 'mysql2/promise';

let getAllCategories = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT id, name FROM Categories');
        await connection.end();
        return rows;
    } catch (err) {
        throw err;
    }
};

export default {
    getAllCategories
};