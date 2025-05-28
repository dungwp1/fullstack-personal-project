import mysql from 'mysql2/promise';

let getAllUser = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT * FROM users');
        await connection.end();
        return rows;
    } catch (err) {
        throw err;
    }
};

let createNewUser = async (data) => {
    try {
        if (!data || !data.username || !data.password) {
            throw new Error('Missing username or password');
        }
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const { username, password } = data;
        const [result] = await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username,  password]
        );
        await connection.end();
        return { errCode: 0, errMessage: 'User created successfully', userId: result.insertId };
    } catch (err) {
        throw err;
    }
};

export default {
    getAllUser,
    createNewUser,  
};