import mysql from 'mysql2/promise';

let getAllProducts = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT id, name, brandId FROM Products');
        await connection.end();
        return rows;
    } catch (err) {
        throw err;
    }
};

let getProductByBrandId = async (brandId) => {
    console.log('getBrandById called with brandId:', brandId);
    if (!brandId) {
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

        const [rows] = await connection.execute('SELECT id, name, brandId FROM Products WHERE brandId = ?', [brandId]);
        await connection.end();

        if (rows.length === 0) {
            throw new Error('Brand not found');
        }

        return rows;
    } catch (err) {
        throw err;
    }
}
// Exporting the functions to be used in controllers    

export default {
    getAllProducts,
    getProductByBrandId
};