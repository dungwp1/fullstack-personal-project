import React, { useEffect, useState } from 'react';
import api from "../../axios/api";

const AddItem = ({ onAdd }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [brands, setBrands] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setselectedDeviceId] = useState('');
    const [colors, setColors] = useState([]);
    const [selectedColorId, setSelectedColorId] = useState('');

    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [selectedPreview, setSelectedPreview] = useState(null);



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
        if (categories.length) {
            console.log('✅ Categories changed:', categories);
        }
        if (brands.length) {
            console.log('✅ Brands changed:', brands);
        }
        if (devices.length) {
            console.log('✅ Devices changed:', devices);
        }
        if (price.length) {
            console.log('✅ Price changed:', price);
        }
        if (note.length) {
            console.log('✅ Note changed:', note);
        }
        if (imageFiles.length) {
            console.log('✅ Image files changed:', imageFiles);
        }
        if (imagePreviews.length) {
            console.log('✅ Image previews changed:', imagePreviews);
        }
    }, [categories, brands, devices, price, note, imageFiles, imagePreviews]);

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
            const response = await api.get(`/api/devices/get-device-by-id/${brandId}`);
            const data = response.data.data;
            console.log('Devices for selected brand:', data);
            setDevices(data);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const handleDeviceChange = async (event) => {
        const deviceId = event.target.value;
        setselectedDeviceId(deviceId);
        console.log('Device ID:', deviceId);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files); // lưu file để upload

        const previews = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                // update khi đã có preview của toàn bộ ảnh
                if (previews.length === files.length) {
                    setImagePreviews(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // 🧩 Append text fields
        formData.append('categoryId', selectedCategoryId);
        formData.append('brandId', selectedBrandId);
        formData.append('deviceId', selectedDeviceId);
        formData.append('price', price);
        formData.append('note', note);
        console.log('Form data:', {
            categoryId: selectedCategoryId,
            brandId: selectedBrandId,
            deviceId: selectedDeviceId,
            price: price,
            note: note,
        });
        // 🖼️ Append images (support multiple)
        imageFiles.forEach((file, index) => {
            formData.append('images', file); // key "images" là mảng file[]
        });
        console.log('Form data with images:', formData.getAll('images'));
        // Kiểm tra xem có ảnh nào không
        if (imageFiles.length === 0) {
            alert('Vui lòng chọn ít nhất một ảnh sản phẩm.');
            return;
        }
        // Gửi dữ liệu đến API
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Nếu đã có key đó, đảm bảo là mảng
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        console.log('✅ FormData dưới dạng object đầy đủ:', data);

        try {
            const response = await api.post('/api/items/create-item', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('✅ Tạo item thành công:', response.data);
            alert('Thêm sản phẩm thành công!');
            // Reset form nếu cần
        } catch (error) {
            console.error('❌ Lỗi khi tạo item:', error);
            alert('Đã xảy ra lỗi khi thêm sản phẩm.');
        }
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
                            value={selectedDeviceId}
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
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">Màu sắc</label>
                        <select
                            value={selectedDeviceId}
                            onChange={handleDeviceChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn màu sắc --</option>
                            {colors.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">Dung lượng</label>
                        <select
                            value={selectedDeviceId}
                            onChange={handleDeviceChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Chọn dung lượng --</option>
                            {colors.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
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
                {/* Ảnh sản phẩm */}
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                        Ảnh sản phẩm
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageChange(e)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {imagePreviews.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Ảnh ${index + 1}`}
                                onClick={() => setSelectedPreview(src)}
                                className="w-full h-32 object-cover rounded-lg border"
                            />
                        ))}
                    </div>
                )}
                {selectedPreview && (
                    <div
                        className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                        onClick={() => setSelectedPreview(null)} // click ra ngoài để đóng
                    >
                        <img
                            src={selectedPreview}
                            alt="Ảnh full"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
                        />
                        <button
                            onClick={() => setSelectedPreview(null)}
                            className="absolute top-6 right-6 text-white text-3xl font-bold bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
                        >
                            ×
                        </button>
                    </div>
                )}
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