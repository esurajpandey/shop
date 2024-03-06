import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import AdminPage from "./page/AdminPage/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./page/Contact";
import Help from "./page/HelpCenter";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import OtpVerify from "./components/OtpVerification/OtpVerify";
import Cart from "./components/cart/cart-items/Cart";
import Product from "./components/product/Product";
import styled from "styled-components";
import Account from "./components/account/Account";
import Wishlist from "./components/wishlist/Wishlist";

import Order from "./components/order/Order";
import OrderDetails from "./components/order/OrderDetails";
import PaymentSuccess from "./page/PaymentSuccess";
import CategoryPage from "./page/Category/CategoryPage";
import Search from "./page/Search";
import HelpCenter from "./page/HelpCenter";
import AboutPage from "./page/About";
import ReturnPolicyPage from "./page/ReturnPolicy";
import TermsPage from "./page/Terms";
import PaymentOptionsPage from "./page/Payment-page";

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
            <Route path="/category/:query" element={<CategoryPage />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/help" element={<Help />} />
            <Route path="/verify-account" element={<OtpVerify />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Wishlist />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/search/:searchParams" element={<Search />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="payment-method" element={<PaymentOptionsPage />} />

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
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 480px){
  
  }
`;

export default App;
