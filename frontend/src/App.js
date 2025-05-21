import React from "react";
import LoginForm from "./LoginForm";

// API giả lập
const fakeLoginAPI = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập kiểm tra tài khoản
      if (email === "admin@example.com" && password === "123456") {
        resolve({ success: true, token: "fake-jwt-token" });
      } else {
        reject({ success: false, message: "Email hoặc mật khẩu sai" });
      }
    }, 1000); // delay 1 giây
  });
};

function App() {
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fakeLoginAPI({ email, password });
      alert("Đăng nhập thành công!");
      console.log("Token:", response.token);
    } catch (error) {
      alert(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default App;
