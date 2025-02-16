import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/cartSlice";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // ✅ ฟังก์ชันสร้าง CSV และดาวน์โหลดใบเสร็จ
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("🚨 Your cart is empty!");
      return;
    }

    let csvContent = "Product Name, Quantity, Price (฿), Total (฿)\n";

    cart.forEach((item) => {
      csvContent += `${item.name}, ${item.qty}, ${item.price}, ${item.price * item.qty}\n`;
    });

    csvContent += `\nTotal Amount,, ,${total} ฿\n`;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "receipt.csv");

    // ✅ ล้างตะกร้าสินค้า
    localStorage.removeItem("cart");
    dispatch({ type: "cart/clearCart" });

    alert("✅ Checkout successful! Your receipt has been downloaded.");
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col items-center p-4 transition-colors duration-300 
                  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-3xl font-bold mb-4">
        🛒 <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Shopping Cart</span>
      </h1>

      {cart.length === 0 ? (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-300">Your cart is empty.</p>
          <button
            onClick={() => navigate("/virtualized-list")}
            className={`mt-4 px-6 py-3 text-lg font-semibold rounded transition-colors 
                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            🛒 Browse Products
          </button>
        </>
      ) : (
        <>
          <div
            className={`w-full max-w-2xl p-4 shadow-md rounded-lg transition-colors 
                        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center p-3 border-b transition-colors 
                            ${darkMode ? "border-gray-700" : "border-gray-300"}`}
              >
                <span className="text-lg">{item.name} - {item.price} ฿ x {item.qty}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty - 1 }))}
                    className={`p-2 text-lg rounded transition-colors 
                                ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-300 hover:bg-gray-400 text-black"}`}
                  >
                    <FaMinus />
                  </button>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, qty: item.qty + 1 }))}
                    className={`p-2 text-lg rounded transition-colors 
                                ${darkMode ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-400 hover:bg-green-500 text-black"}`}
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className={`p-2 text-lg rounded transition-colors 
                                ${darkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ยอดรวมสินค้า */}
          <h3 
            className={`mt-4 text-xl font-bold text-center transition-colors 
                        ${darkMode ? "text-yellow-400" : "text-green-600"}`}
          >
            Total: {total} ฿
          </h3>

          {/* ✅ ปุ่ม Checkout */}
          <button
            onClick={handleCheckout}
            className={`mt-6 px-6 py-3 text-lg font-semibold rounded transition-colors 
                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-white" : "bg-gray-600 hover:bg-gray-900 text-white"}`}
          >
            🏷️ Checkout & Download Receipt
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
