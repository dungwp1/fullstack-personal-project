import mysql from 'mysql2/promise';

let getAllItems = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute(`
            SELECT 
                i.id AS itemId,
                c.name AS categoryName,
                b.name AS brandName,
                d.name AS deviceName,
                price,
                note,
                JSON_ARRAYAGG(ii.imageUrl) AS imageUrl
            FROM Items i 
            LEFT JOIN Categories c ON i.categoryId = c.id 
            LEFT JOIN Brands b ON i.brandId = b.id
            LEFT JOIN Devices d ON i.deviceId = d.id
            LEFT JOIN ItemImages ii ON i.id = ii.itemId
            GROUP BY i.id, c.name, b.name, d.name, i.price
        `);
        await connection.end();
        return rows;
    } catch (err) {
        throw err;
    }
};

let createItem = async (data, images) => {
    console.log('Creating item with data:', data);
    console.log('Creating images:', images);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // 1. Insert vào bảng Items
        const [result] = await connection.execute(
            'INSERT INTO Items (categoryId, brandId, deviceId, price, note, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            [
                data.categoryId,
                data.brandId,
                data.deviceId,
                data.price,
                data.note
            ]
        );

        const insertedItemId = result.insertId;
        console.log('✅ Inserted item with ID:', insertedItemId);

        // 2. Insert ảnh vào bảng ItemImages
        if (images && images.length > 0) {
            const insertImagePromises = images.map((file) => {
                const imagePath = '/uploads/' + file.filename; // file.filename được multer xử lý
                return connection.execute(
                    'INSERT INTO ItemImages (itemId, imageUrl, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
                    [insertedItemId, imagePath]
                );
            });

            await Promise.all(insertImagePromises);
            console.log('✅ Inserted all images.');
        }

        await connection.end();

        return {
            id: insertedItemId,
            ...data,
            imageCount: images.length
        };

    } catch (err) {
        console.error('❌ Error in createItem:', err);
        throw err;
    }
};


// Exporting the functions to be used in controllers    

export default {
    getAllItems,
    createItem
};