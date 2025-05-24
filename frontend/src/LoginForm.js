import React, { useEffect, useState } from "react";
import axios from "axios";
function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/get-all-users");
                setListUser(response.data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 shadow-md rounded bg-white mt-10">
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
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
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
