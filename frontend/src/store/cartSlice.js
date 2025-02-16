import { createSlice } from "@reduxjs/toolkit";

// โหลดข้อมูลตะกร้าจาก LocalStorage ถ้ามี (มิฉะนั้นใช้ค่าเริ่มต้น)
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const loadTotalFromStorage = () => {
  const storedTotal = localStorage.getItem("total");
  return storedTotal ? JSON.parse(storedTotal) : 0;
};

const initialState = {
  cart: loadCartFromStorage(),
  total: loadTotalFromStorage(),
};

// ฟังก์ชันบันทึกค่าใน LocalStorage
const saveCartToStorage = (cart, total) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ ...product, qty: 1 });
      }
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

      // ✅ บันทึกลง LocalStorage
      saveCartToStorage(state.cart, state.total);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

      // ✅ บันทึกลง LocalStorage
      saveCartToStorage(state.cart, state.total);
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.qty = Math.max(1, qty);
        state.total = state.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

        // ✅ บันทึกลง LocalStorage
        saveCartToStorage(state.cart, state.total);
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.total = 0;

      // ✅ ล้างค่าใน LocalStorage
      saveCartToStorage(state.cart, state.total);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
