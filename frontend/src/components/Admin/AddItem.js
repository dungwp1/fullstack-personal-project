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
        <div className="max-w-4xl mx-auto mt-16 px-8 py-10 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
                Thêm sản phẩm mới
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Loại thiết bị */}
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Loại thiết bị
                    </label>
                    <select
                        value={selectedCategoryId}
                        onChange={handleCategoryChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Chọn loại thiết bị --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Hãng - Thiết bị - Giá: cùng một hàng */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Hãng
                        </label>
                        <select
                            value={selectedBrandId}
                            onChange={handleBrandChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn hãng --</option>
                            {brands.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Thiết bị
                        </label>
                        <select
                            value={selectedDevice}
                            onChange={handleDeviceChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn thiết bị --</option>
                            {devices.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">Giá bán</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Nhập giá bán"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Mô tả: 1 hàng riêng, textarea co giãn */}
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Thông tin mô tả
                    </label>
                    <textarea
                        name="note"
                        placeholder="Thông tin mô tả"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden transition-all duration-200"
                        onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                    />
                </div>

                {/* Nút submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
                    >
                        Thêm sản phẩm
                    </button>
                </div>
            </form>
        </div>

    );
};

export default AddItem;