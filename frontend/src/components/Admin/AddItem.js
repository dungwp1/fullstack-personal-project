import React, { useEffect, useState } from 'react';
import api from "../../axios/api";

const AddItem = ({ onAdd }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');

    const [quality, setQuality] = useState('');
    const [color, setColor] = useState('');
    const [capacity, setCapacity] = useState('');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories/get-all-categories');
                const data = response.data.data;
                console.log('Check data:', data);
                setCategories(data);
            } catch (error) {

                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);
    useEffect(() => {
        console.log('✅ Categories changed:', categories);
    }, [categories]);

    useEffect(() => {
        console.log('✅ Brands changed:', brands);
    }, [brands]);
    useEffect(() => {
        console.log('✅ Device changed:', devices);
    }, [devices]);

    const handleChange = (e) => {
        alert('not build yet', e);
    };

    const handleCategoryChange = async (event) => {
        const categoryId = event.target.value;
        setSelectedCategoryId(categoryId);
        console.log('Category ID:', categoryId);
        try {
            const response = await api.get(`/api/brands/get-brand-by-id/${categoryId}`);
            const data = response.data.data;
            console.log('Brands for selected category:', data);
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleBrandChange = async (event) => {
        const brandId = event.target.value;
        setSelectedBrandId(brandId);
        console.log('Brand ID:', brandId);
        try {
            const response = await api.get(`/api/products/get-product-by-id/${brandId}`);
            const data = response.data.data;
            console.log('Devices for selected brand:', data);
            setDevices(data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const handleDeviceChange = async (event) => {
        const deviceId = event.target.value;
        setSelectedDevice(deviceId);
        console.log('Device ID:', deviceId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // ...handle submit logic...
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
            <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Chọn loại thiết bị */}
                <div>
                    <label className="block text-base font-semibold text-gray-700 mb-1">Loại thiết bị</label>
                    <select
                        value={selectedCategoryId}
                        onChange={(event) => handleCategoryChange(event)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                    >
                        <option value="">-- Chọn loại thiết bị --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hãng</label>
                        <select
                            value={selectedBrandId}
                            onChange={(event) => handleBrandChange(event)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        >
                            <option value="">-- Chọn hãng --</option>
                            {brands.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thiết bị</label>
                        <select
                            value={selectedDevice}
                            onChange={(event) => handleDeviceChange(event)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                        >
                            <option value="">-- Chọn thiết bị --</option>
                            {devices.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
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