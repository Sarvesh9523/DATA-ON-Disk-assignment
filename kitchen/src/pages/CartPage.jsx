import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../features/cartSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getTimeLeft } from "../utils/timeleft"; // countdown utility


export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [timeLefts, setTimeLefts] = useState({}); // countdown for preorder items

  // ✅ Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLefts = {};
      cartItems.forEach((item) => {
        if (item.preorder) {
          newTimeLefts[item.id] = getTimeLeft(item.preorderFor);
        }
      });
      setTimeLefts(newTimeLefts);
    }, 1000);

    return () => clearInterval(interval);
  }, [cartItems]);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      toast.error("Please fill all the details!");
      return;
    }

    const orderDetails = {
      user: { name, phone, address },
      items: cartItems,
      date: new Date().toISOString(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, orderDetails);
      toast.success("Order placed successfully!");
      dispatch(clearCart());

      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order!");
    }

  };

  if (cartItems.length === 0)
    return <p className="p-6 text-lg">Your cart is empty.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="border p-2 flex justify-between items-center mb-2 rounded"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p>${item.price}</p>
            {item.preorder ? (
              <p className="text-sm text-orange-600">
                Preorder for {item.preorderFor} ({timeLefts[item.id] || ""})
              </p>
            ) : (
              <p className="text-sm text-green-600">Delivering Today</p>
            )}
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {/* User Details Form */}
      <form
        onSubmit={handleOrder}
        className="mt-6 border p-4 rounded shadow-md max-w-md"
      >
        <h3 className="text-xl font-bold mb-4">Your Details</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
