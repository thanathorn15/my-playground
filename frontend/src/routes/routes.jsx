
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ShoppingCart from "../pages/ShoppingCart";
import PaginationExample from "../pages/PaginationExample";
import NotFound from "../pages/Notfound";
import Navbar from "../components/Navbar"; // Navbar สำหรับเมนูเปลี่ยนหน้า
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import ManageProducts from "../pages/ManageProducts";
import Login from "../pages/Login";
import TrackingMap from "../pages/TrackingMap";


const AppRoutes = () => {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products-list" element={<ProductList />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/page-exam" element={<PaginationExample />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/tracking-map" element={<TrackingMap />} /> 
      </Routes>
    </>
  );
};

export default AppRoutes;