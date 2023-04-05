import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import AdminPage from "./page/AdminPage/AdminPage";
import Navbar from "./components/Navbar/Navbar";
import About from "./page/About";
import Contact from "./page/Contact";
import Help from "./page/Help";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
