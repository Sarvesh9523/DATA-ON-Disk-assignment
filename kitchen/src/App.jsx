import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FoodDetail from "./pages/FoodDetail";
import CartPage from "./pages/CartPage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
