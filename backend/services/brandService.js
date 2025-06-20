import mysql from 'mysql2/promise';

let getAllBrands = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT id, name, categoryId FROM Brands');
        await connection.end();
        return rows;
    } catch (err) {
        throw err;
    }
};

let getBrandById = async (categoryId) => {
    console.log('getBrandById called with categoryId:', categoryId);
    if (!categoryId) {
        throw new Error('Missing required parameter: id');
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT id, name, categoryId FROM Brands WHERE categoryId = ?', [categoryId]);
        await connection.end();

        if (rows.length === 0) {
            throw new Error('categoryId not found');
        }

        return rows;
    } catch (err) {
        throw err;
    }
}
// Exporting the functions to be used in controllers    

export default {
    getAllBrands,
    getBrandById
};