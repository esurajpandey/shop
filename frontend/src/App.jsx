import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import AdminPage from "./page/AdminPage/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import About from "./page/About";
import Contact from "./page/Contact";
import Help from "./page/Help";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import OtpVerify from "./components/OtpVerification/OtpVerify";
import Cart from "./components/cart/cart-items/Cart";
import Product from "./components/product/Product";
import styled from "styled-components";
import Account from "./components/account/Account";
import { OrderedList } from "@chakra-ui/react";
import Order from "./components/order/Order";
import OrderDetails from "./components/order/OrderDetails";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      return navigate("/login");
    }
    setUser(data);
  }, []);

  return (
    <MainApp>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/:searchQuery" exact element={<></>} />
            <Route path="/orders" element={<Order />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/verify-account" element={<OtpVerify />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<Product />} />
            {user?.type === "ADMIN" && (
              <Route path="/admin/*" element={<AdminPage />} />
            )}
            <Route path="/account/*" element={<Account />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </MainApp>
  );
}

const MainApp = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export default App;
