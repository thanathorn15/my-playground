
import usePagination from "../hooks/usePagination";

const PaginationExample = () => {
  const { data, currentPage, totalPages, nextPage, prevPage, loading, error } = usePagination(
    "https://jsonplaceholder.typicode.com/posts", // API ตัวอย่าง
    5 // จำนวนข้อมูลต่อหน้า
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">📜 Paginated Data</h1>

      {loading && <p>⏳ Loading...</p>}
      {error && <p className="text-red-500">❌ Error: {error}</p>}

      {/* 🔹 แสดงข้อมูล */}
      {!loading && !error && (
        <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg ">
          {data.map((item) => (
            <div key={item.id} className="p-2 border-b">
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
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          ◀ Previous
        </button>

        <span className="text-xl font-bold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next ▶
        </button>
      </div>

    
    </div>
  );
};

export default PaginationExample;
