import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      alert("✅ Login Successful!");
      localStorage.setItem("currentUser", JSON.stringify(user)); // ✅ เก็บข้อมูลผู้ใช้ที่ Login
      navigate("/"); // ✅ กลับไปหน้า Home
    } else {
      setError("🚨 Invalid Email or Password!");
    }
  };

  return (
    <div className={`w-screen h-screen flex justify-center items-start pt-20 p-6 transition-colors duration-300 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg transition-colors 
                      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <h2 className="text-3xl font-bold text-center mb-6">
          🔐 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Login</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Email</label>
            <input type="email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
          </div>

          <div>
            <label className="block text-lg font-medium">Password</label>
            <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className={`w-full p-3 border rounded-md focus:outline-none 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`} />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button onClick={handleLogin} className={`w-full py-3 text-lg font-semibold rounded-md transition-colors 
                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            🔓 Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
