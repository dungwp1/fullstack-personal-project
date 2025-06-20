import React, { useEffect, useState } from "react";
import api from "./axios/api";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/api/users/get-all-users");
                setListUser(response.data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        try {
            const response = await api.post(
                `/api/users/create-new-user?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            );
            if (response.data.errCode === 0) {
                alert("Tạo người dùng thành công");
                setEmail("");
                setPassword("");
                const updatedUsers = [...listUser, { id: response.data.userId, username: email, password: password }];
                setListUser(updatedUsers);
            } else {
                alert(response.data.errMessage);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Đã xảy ra lỗi khi tạo người dùng");
        }
    };

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        try {
            const response = await api.post("/api/users/login", {
                username: email,
                password: password
            });
            if (response.data.errCode === 0) {
                alert("Đăng nhập thành công");
                navigate("/home", {
                    state: { username: email }
                });
            } else {
                alert(response.data.errMessage);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Đã xảy ra lỗi khi đăng nhập");
        }
    }


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
            <form
                className="w-full max-w-sm p-8 shadow-lg rounded-lg bg-white"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateUser();
                }}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Đăng ký người dùng</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Nhập email"
                        className="block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="block w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full font-semibold hover:bg-blue-600 transition mb-3"
                >
                    Thêm người dùng
                </button>
                <button
                    type="button"
                    className="bg-green-500 text-white py-2 px-4 rounded w-full font-semibold hover:bg-green-600 transition"
                    onClick={() => handleLogin()}
                >
                    Đăng nhập
                </button>
            </form>
            <div className="w-full max-w-sm mt-8">
                <h3 className="text-lg font-bold mb-4 text-gray-700">Danh sách người dùng</h3>
                {listUser && listUser.length > 0 ? (
                    <ul className="space-y-3">
                        {listUser.map((user) => (
                            <li
                                key={user.id}
                                className="p-4 bg-white rounded shadow flex flex-col"
                            >
                                <span className="font-semibold text-blue-700">{user.username}</span>
                                <span className="text-gray-500 text-sm">Mật khẩu: {user.password}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">Chưa có người dùng nào.</p>
                )}
            </div>
        </div>
    );
}

export default LoginForm;
