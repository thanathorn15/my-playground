import { useSelector } from "react-redux";
import usePagination from "../hooks/usePagination";

const PaginationExample = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode); // ✅ ดึงค่า Dark Mode
  const { data, currentPage, totalPages, nextPage, prevPage, loading, error } = usePagination(
    "https://jsonplaceholder.typicode.com/posts", // API ตัวอย่าง
    5 // จำนวนข้อมูลต่อหน้า
  );

  return (
    <div className={`w-screen h-screen flex flex-col items-center p-6 transition-colors duration-300 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold mb-6">
        📜 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Paginated Data</span>
      </h1>

      {loading && <p>⏳ Loading...</p>}
      {error && <p className="text-red-500"> Error: {error}</p>}

      {/* 🔹 แสดงข้อมูล */}
      {!loading && !error && (
        <div className={`w-full max-w-2xl p-4 shadow-lg rounded-lg transition-colors 
                         ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          {data.map((item) => (
            <div key={item.id} className={`p-2 border-b transition-colors 
                                          ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 ปุ่ม Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded font-semibold transition-colors 
                      ${currentPage === 1 ? "bg-gray-500 text-gray-300 cursor-not-allowed" 
                                          : darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                                                     : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          ◀ Previous
        </button>

        <span className="text-xl font-bold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded font-semibold transition-colors 
                      ${currentPage === totalPages ? "bg-gray-500 text-gray-300 cursor-not-allowed" 
                                                   : darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                                                              : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;
