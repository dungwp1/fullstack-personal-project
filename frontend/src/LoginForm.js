import React, { useState } from "react";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
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
                Đăng nhập
            </button>
        </form>
    );
}

export default LoginForm;
