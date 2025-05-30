import React from "react";
import { useLocation } from "react-router-dom";
const handleLogout = () => {
    window.location.href = "/login"; // Redirect to login page
}

function HomeScreen({ }) {
    const location = useLocation();
    const userName = location.state?.username || "Người dùng"; // Default to "Người dùng" if no name is provided
    if (!userName) {
        return <div className="text-red-500">Bạn cần đăng nhập để truy cập trang này.</div>;
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white p-6">
            <h1 className="text-4xl font-extrabold mb-4">Chào mừng, {userName}!</h1>
            <p className="text-lg mb-8 max-w-xl text-center">
                Đây là trang chủ của bạn. Bạn có thể xem thông tin cá nhân, quản lý tài khoản,
                hoặc tiếp tục các hoạt động khác trong ứng dụng.
            </p>
            <button
                onClick={() => handleLogout()}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
            >
                Đăng xuất
            </button>
        </div>
    );
}

export default HomeScreen;
