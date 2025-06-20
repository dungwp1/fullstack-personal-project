import React, { useState } from 'react';

const AddItem = ({ onAdd }) => {
    const [device, setDevice] = useState('');
    const [brand, setBrand] = useState('');
    const [quality, setQuality] = useState('');
    const [color, setColor] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setDevice(value);
                break;
            case 'Hãng':
                setBrand(value);
                break;
            case 'Chất lượng':
                setQuality(value);
                break;
            case 'Màu sắc':
                setColor(value);
                break;
            case 'Dung lượng':
                setCapacity(value);
                break;
            case 'Giá bán':
                setPrice(value);
                break;
            case 'Thông tin thêm':
                setNote(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ...handle submit logic...
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Loại thiết bị</label>
                    <input
                        type="text"
                        name="name"
                        value={device}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        placeholder="Chọn loại thiết bị"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hãng</label>
                        <input
                            name="Hãng"
                            placeholder="Hãng"
                            value={brand}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chất lượng</label>
                        <input
                            name="Chất lượng"
                            placeholder="Chất lượng"
                            value={quality}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc</label>
                        <input
                            name="Màu sắc"
                            placeholder="Màu sắc"
                            value={color}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dung lượng</label>
                        <input
                            name="Dung lượng"
                            placeholder="Dung lượng"
                            value={capacity}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                        <input
                            name="Giá bán"
                            placeholder="Giá bán"
                            value={price}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thông tin thêm</label>
                        <input
                            name="Thông tin thêm"
                            placeholder="Thông tin thêm"
                            value={note}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
};

export default AddItem;