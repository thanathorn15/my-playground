import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

// โหลดสินค้า จาก localStorage
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const items = storedProducts.length > 0 ? storedProducts : Array.from({ length: 100000 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  image: "" // ถ้าไม่มีสินค้าใน localStorage, จะไม่มีรูป
}));

const Row = ({ index, style, onAddToCart, cart, darkMode }) => {
  const item = items[index];
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.qty : 0;

  return (
    <div
      className={`flex justify-between items-center p-4 border-b text-lg 
                  ${darkMode ? "bg-gray-800 even:bg-gray-700 text-white" : "bg-gray-100 even:bg-gray-200 text-black"}`}
      style={style}
    >
      <div className="flex items-center gap-4">
        {/* แสดงรูปภาพของสินค้า */}
        {item.image && (
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
        )}
        <span className="flex-1 text-left">
          {item.name} - {item.price} ฿
          {quantity > 0 && (
            <span className="ml-3 px-3 py-1 text-white bg-red-500 rounded-full font-bold text-sm">
              {quantity}
            </span>
          )}
        </span>
      </div>

      <button
        onClick={() => onAddToCart(item)}
        className={`px-5 py-2 text-lg rounded transition-colors 
                    ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
      >
        Add
      </button>
    </div>
  );
};

const ProductList = () => {
  const pageSize = 100;
  const [page, setPage] = useState(1);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);
  const currentItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center p-6 transition-colors duration-300 
                  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-3xl font-bold mb-6">
      🏷️ <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Products</span>
      </h1>

      <div className={`w-full max-w-2xl p-4 shadow-md rounded-lg transition-colors 
                      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="w-full max-w-5xl flex justify-center">
          <List
            height={windowHeight - 220}
            itemCount={currentItems.length}
            itemSize={80} // ✅ เพิ่มขนาดแถวให้ใหญ่ขึ้นสำหรับรูป
            width={windowWidth - 40}
          >
            {({ index, style }) => (
              <Row
                index={startIndex + index}
                style={style}
                onAddToCart={(item) => dispatch(addToCart(item))}
                cart={cart}
                darkMode={darkMode}
              />
            )}
          </List>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`w-36 h-12 text-lg font-semibold rounded transition-colors flex justify-center items-center
                      ${darkMode ? "bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 text-white" 
                                : "bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-black"}`}
        >
          ◀ Previous
        </button>

        <span className="text-2xl font-bold w-16 flex justify-center">
          {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={endIndex >= items.length}
          className={`w-36 h-12 text-lg font-semibold rounded transition-colors flex justify-center items-center
                      ${darkMode ? "bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 text-white" 
                                : "bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-black"}`}
        >
          Next ▶
        </button>

        <button
          onClick={() => navigate("/cart")}
          className={`w-36 h-12 text-lg font-semibold rounded transition-colors flex justify-center items-center
                      ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" 
                                : "bg-gray-600 hover:bg-gray-900 text-white"}`}
        >
          🛒 Go to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductList;
