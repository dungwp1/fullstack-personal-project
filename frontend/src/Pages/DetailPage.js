import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axios/api';

const DetailPage = () => {
    const { id } = useParams(); // lấy itemId từ URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                const res = await api.get(`/api/items/get-item-by-id/${id}`);
                setItem(res.data.data);
            } catch (err) {
                console.error('❌ Lỗi khi fetch chi tiết item:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetail();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Đang tải chi tiết...</p>;
    if (!item) return <p className="text-center mt-10">Không tìm thấy sản phẩm.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left: Thumbnail & Preview Images */}
                <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src={`${process.env.REACT_APP_API_URL}${item.imageUrl[0]}`}
                            alt="Main"
                            className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="flex gap-2 mt-1 justify-center flex-wrap">
                        {item.imageUrl.slice(1).map((img, idx) => (
                            <img
                                key={idx}
                                src={`${process.env.REACT_APP_API_URL}${img}`}
                                alt={`preview-${idx}`}
                                className="w-12 h-12 object-cover rounded-md border border-gray-200 hover:border-blue-400 transition-shadow shadow-sm"
                                style={{ background: "#f3f4f6" }}
                            />
                        ))}
                    </div>
                </div>
                {/* Right: Info */}
                <div className="md:w-2/3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{item.deviceName}</h2>
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-semibold">Danh mục:</span> {item.categoryName}</p>
                            <p><span className="font-semibold">Hãng:</span> {item.brandName}</p>
                            <p><span className="font-semibold">RAM:</span> {item.ram}</p>
                            <p><span className="font-semibold">Storage:</span> {item.storage}</p>
                            <p>
                                <span className="font-semibold">Màu:</span>
                                <span className="inline-flex items-center ml-2">
                                    <span
                                        className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                                        style={{ backgroundColor: item.hexCode }}
                                    ></span>
                                    {item.color}
                                </span>
                            </p>
                            <p>
                                <span className="font-semibold">Giá:</span>
                                <span className="text-xl text-red-500 font-bold ml-2">{item.price.toLocaleString()}₫</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Note section below info */}
            <div className="mt-10 p-5 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-600"><span className="font-semibold">Ghi chú:</span> {item.note}</p>
            </div>
        </div>
    );
};

export default DetailPage;
