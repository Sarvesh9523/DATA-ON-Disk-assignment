import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import foods from "../data/food"; // Make sure this path is correct

export default function FoodDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find the food by ID
  const food = foods.find((f) => f.id === parseInt(id));
  if (!food) return <p>Food not found</p>;

  // --- Core Time Logic ---

  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = days[today.getDay()];
  const currentHour = today.getHours();

  // ✅ Order window: 7 AM on one day until 1 AM.
  const withinTimeWindow = currentHour >= 7 || currentHour < 1;

  // ✅ This logic treats the hour after midnight (12 AM - 1 AM)
  //    as belonging to the *previous* day's ordering window.
  let adjustedDay = currentDay;
  if (currentHour < 1) {
    const prevIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    adjustedDay = days[prevIndex];
  }

  // ✅ Can order "now" only if the adjusted day matches the food's delivery day.
  const canOrderToday = adjustedDay === food.deliveryDay && withinTimeWindow;

  // --- Button and Handler Logic ---

  let buttonLabel = "";
  if (!withinTimeWindow) {
    buttonLabel = "Ordering Closed (7 AM – 1 AM)";
  } else if (canOrderToday) {
    buttonLabel = "Order Now";
  } else {
    buttonLabel = `Preorder (Next ${food.deliveryDay})`;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...food,
        preorder: !canOrderToday,
        preorderFor: food.deliveryDay,
      })
    );

    if (canOrderToday) {
      toast.success(`${food.title} added to cart!`);
    } else {
      toast.info(`${food.title} preordered for ${food.deliveryDay}`);
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Food Image */}
      <img
        src={food.image}
        alt={food.title}
        className="w-full md:w-64 h-64 object-cover rounded"
      />

      {/* Food Details */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold">{food.title}</h1>
          <p className="text-gray-600 mt-1">{food.description}</p>
          <p className="font-semibold text-blue-600 mt-2">${food.price}</p>
          <p className="text-yellow-500 mt-1">⭐ {food.rating}</p>
          <p className="text-gray-500 mt-2">
            Available on: <b>{food.deliveryDay}</b>
          </p>
        </div>

        {/* Order Button */}
        <button
          onClick={handleAddToCart}
          disabled={!withinTimeWindow}
          className={`mt-4 px-4 py-2 rounded text-white ${
            withinTimeWindow
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {buttonLabel}
        </button>

        {/* Show current day & time for debugging */}
        <p className="text-sm text-gray-500 mt-3">
          Current Time: {currentDay}, {today.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}