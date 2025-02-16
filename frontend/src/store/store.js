import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import darkModeReducer from "./darkModeSlice"; // ✅ นำเข้า Dark Mode Slice


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    darkMode: darkModeReducer, // ✅ เพิ่ม Dark Mode Reducer
  },
});
