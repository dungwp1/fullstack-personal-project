import React, { useEffect, useState } from 'react';
import api from "../axios/api";
import { Navigate, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
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

    const handleItemClick = (itemId) => {
        console.log('Item clicked with ID:', itemId);
        navigate(`/detail/${itemId}`);
    };


    if (loading) return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
    return (
        <div className="w-[80%] mx-auto p-8 bg-gradient-to-br from-blue-100 to-white min-h-screen">
            <h1 className="text-4xl font-bold text-blue-900 text-center mb-10 shadow-sm tracking-wider">
                Danh sách sản phẩm
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item.itemId}
                        className="border border-blue-100 rounded-xl shadow-md hover:shadow-xl transition duration-200 p-5 bg-white flex flex-col "
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => handleItemClick(item.itemId)}
                        >

                            <img
                                src={`${process.env.REACT_APP_API_URL}${item.imageUrl[0]}`}
                                alt="Product"
                                className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200 hover:scale-105 transition-transform duration-200"
                            />
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="font-semibold text-lg text-blue-800 mb-1">{item.deviceName}</p>

                                <div className="flex gap-3 mt-1 items-center">
                                    <div
                                        className="w-4 h-4 rounded-full border border-gray-300"
                                        style={{ backgroundColor: item.hexCode }}>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                        {item.ram}
                                    </span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                        {item.storage}
                                    </span>
                                </div>
                                <p className="text-blue-700 font-medium text-base mt-2">
                                    Giá: <span className="text-gray-900">{item.price}₫</span>
                                </p>
                            </div>
                        </div>
                        {item.imageUrl && item.imageUrl.length > 1 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {item.imageUrl.map((img, idx) => (
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${img}`}
                                        alt={`preview-${idx}`}
                                        className="w-12 h-12 object-cover rounded border border-blue-50 hover:scale-105 transition"
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
