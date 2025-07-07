import React, { useEffect, useState } from 'react';
import api from "../axios/api";

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await api.get('/api/items/get-all-items');
                console.log('Check state items:', response.data.data);
                setItems(response.data.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllItems();
    }, []);

    useEffect(() => {
        console.log('Items state updated:', items);
        console.log('Image0 state updated:', items[0]);
    }, [items]);
    useEffect(() => {
        console.log('Loading state:', loading);
    }, [loading]);

    if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Danh sách sản phẩm</h1>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div key={item.itemId} className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">

                        <img
                            src={`${process.env.REACT_APP_API_URL}${item.imageUrl[0]}`}
                            alt="Product"
                            className="w-full h-48 object-cover rounded mb-4"
                        />

                        <div>
                            <p className="font-semibold text-gray-800 mb-2">{item.deviceName}</p>
                            <p className="font-semibold text-gray-800 mb-2">{item.categoryName}</p>
                            <p className="text-gray-700">Giá: {item.itemPrice}₫</p>
                            <p className="text-gray-500 text-sm mt-2">Ghi chú: {item.itemNote}</p>
                        </div>
                        {item.imageUrl && item.imageUrl.length > 1 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {item.imageUrl.slice(0).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={`${process.env.REACT_APP_API_URL}${img}`}
                                        alt={`preview-${idx}`}
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
