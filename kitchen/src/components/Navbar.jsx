import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi"; 

export default function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Foodie App</Link>
      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/cart" className="relative flex items-center">
          <FiShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
