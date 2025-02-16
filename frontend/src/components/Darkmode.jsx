import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/darkModeSlice";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  // อัปเดตสีพื้นหลังของ `<html>` แทน `<body>` เพื่อให้ Tailwind ใช้งาน `dark:` ได้
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-4 py-2 rounded transition duration-300 
                 bg-gray-800 text-white hover:bg-gray-600 
                 dark:bg-yellow-400 dark:text-black"
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
