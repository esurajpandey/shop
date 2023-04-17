import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import AdminPage from "./page/AdminPage/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import About from "./page/About";
import Contact from "./page/Contact";
import Help from "./page/Help";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import axios from "axios";
import OtpVerify from "./components/OtpVerification/OtpVerify";
import Cart from "./components/cart/cart-items/Cart";
import Product from "./components/product/Product";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.baseURL = "http://127.0.0.1:5000";
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
    axios.defaults.headers.common = { Authorization: `bearer ${user.token}` };
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/:searchQuery" exact element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<OtpVerify />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
