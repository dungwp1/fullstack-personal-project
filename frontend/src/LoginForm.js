import React, { useEffect, useState } from "react";
import api from "./axios/api";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/get-all-users");
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
            `/create-new-user?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
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


    return (
        <div>
            <form className="max-w-sm mx-auto p-6 shadow-md rounded bg-white mt-10">
                <h2 className="text-xl font-bold mb-4 text-center">Đăng nhập</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="block w-full border mb-4 p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="block w-full border mb-4 p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={()=>handleCreateUser()} type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
                    Thêm
                </button>
            </form>
            <div>
                {listUser && listUser.length > 0 && listUser.map((user) => (
                    <div key={user.id} className="max-w-sm mx-auto p-4 shadow-md rounded bg-white mt-4">
                        <h3 className="text-lg font-semibold">{user.username}</h3>
                        <p>password: {user.password}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default LoginForm;
