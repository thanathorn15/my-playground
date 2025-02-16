import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // ✅ ดึงค่า Dark Mode

const ManageProducts = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode); // ✅ ใช้ Redux Store
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // บันทึกข้อมูลลง localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("products", JSON.stringify(items));
  };

  // เพิ่มสินค้าใหม่
  const addProduct = () => {
    if (!product.name || !product.price || !product.image) {
      alert("🚨 กรุณากรอกข้อมูลสินค้าให้ครบถ้วน!");
      return;
    }

    const newProduct = { ...product, id: Date.now() };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
    setProduct({ name: "", price: "", image: "" });
  };

  // อัปโหลดรูปภาพ และแปลงเป็น Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ลบสินค้า
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
  };

  // ตั้งค่าข้อมูลสำหรับแก้ไข
  const editProduct = (index) => {
    setProduct(products[index]);
    setEditingIndex(index);
  };

  // บันทึกข้อมูลที่แก้ไข
  const updateProduct = () => {
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { ...product };
      setProducts(updatedProducts);
      saveToLocalStorage(updatedProducts);
      setProduct({ name: "", price: "", image: "" });
      setEditingIndex(null);
    }
  };

  return (
    <div className={`w-screen h-screen flex flex-col items-center p-6 transition-colors duration-300 
                     ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-3xl font-bold mb-4">
        🛠️ <span className={darkMode ? "text-yellow-400" : "text-blue-500"}>Manage Products</span>
      </h1>

      {/* Form สำหรับเพิ่ม/แก้ไขสินค้า */}
      <div className={`w-full max-w-lg p-4 shadow-md rounded-lg transition-colors 
                      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className={`w-full p-3 border rounded-md mb-3 focus:outline-none transition-colors 
                      ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className={`w-full p-3 border rounded-md mb-3 focus:outline-none transition-colors 
                      ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
        />
        <input type="file" onChange={handleImageUpload} className="mb-3" />
        {product.image && <img src={product.image} alt="Preview" className="w-24 h-24 object-cover mb-3 rounded-md" />}

        {editingIndex !== null ? (
          <button onClick={updateProduct} className={`w-full py-3 rounded-md font-semibold transition-colors 
                                                      ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            ✏ Update Product
          </button>
        ) : (
          <button onClick={addProduct} className={`w-full py-3 rounded-md font-semibold transition-colors 
                                                   ${darkMode ? "bg-green-500 hover:bg-green-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
            ➕ Add Product
          </button>
        )}
      </div>

      {/* แสดงรายการสินค้า */}
      <div className="w-full max-w-lg mt-6">
        {products.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No products available.</p>
        ) : (
          products.map((p, index) => (
            <div key={p.id} className={`flex items-center justify-between p-3 rounded-md mb-3 shadow-md transition-colors 
                                        ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}>
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="text-lg font-bold">{p.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{p.price} ฿</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editProduct(index)} className={`px-3 py-2 rounded-md font-semibold transition-colors 
                                                                        ${darkMode ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
                  ✏ Edit
                </button>
                <button onClick={() => deleteProduct(p.id)} className={`px-3 py-2 rounded-md font-semibold transition-colors 
                                                                        ${darkMode ? "bg-red-500 hover:bg-red-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"}`}>
                  ⛔ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
