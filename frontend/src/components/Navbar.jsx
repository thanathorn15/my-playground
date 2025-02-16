import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DarkModeToggle from "./Darkmode";
import { isUserLoggedIn } from "../utils/auth"; // ✅ Import ฟังก์ชันตรวจสอบ
import { FiLogOut } from "react-icons/fi"; // ✅ Import ไอคอน
const Navbar = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, [localStorage.getItem("currentUser")]); // ✅ ตรวจสอบทุกครั้งที่ currentUser เปลี่ยน

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={`p-4 shadow-md transition duration-300 flex justify-between items-center 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-blue-500 text-white"}`}>
      {/* ✅ เมนูด้านซ้าย */}
      <ul className="flex items-center space-x-6">
        <li><Link to="/" className="hover:underline">🏠 Home</Link></li>

        {/* ✅ แสดงเมนูเฉพาะเมื่อ Login แล้ว */}
        {isLoggedIn && (
          <>
            <li><Link to="/products-list" className="hover:underline">🏷️ Products</Link></li>
            <li><Link to="/cart" className="hover:underline">🛒 Cart</Link></li>
            <li><Link to="/chat" className="hover:underline">💬 Chat</Link></li>
            <li><Link to="/manage-products" className="hover:underline">🛠️ Manage</Link></li>
            <li><Link to="/page-exam" className="hover:underline">📜 Page Exam</Link></li>
            <li><Link to="/tracking-map" className="hover:underline">🗺 Tracking</Link></li>
          </>
        )}
      </ul>

      {/* ✅ เมนูด้านขวา */}
      <div className="flex items-center space-x-4">
        <DarkModeToggle />

        {isLoggedIn ? (
     <button 
     onClick={handleLogout} 
     className={`px-4 py-2 rounded-md flex items-center gap-2 transition duration-300 
                 ${darkMode ? "bg-red-500 hover:bg-red-600 text-white" 
                            : " text-white"}`}
   >
     <FiLogOut size={20} /> Logout
   </button>
        ) : (
          <>
            <Link to="/register" className="hover:underline">📝 Register</Link>
            <Link to="/login" className="hover:underline">🔐 Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
