import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  return (
    <div className="flex flex-col border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img
        src={food.image}
        alt={food.title}
        className="w-full h-48 sm:h-56 object-contain bg-gray-50"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 truncate">
            {food.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {food.description}
          </p>
          <p className="text-xs text-gray-500">
            Available on: <strong>{food.deliveryDay}</strong>
          </p>
        </div>

        {/* Price and Action Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
          <span className="text-xl font-bold text-gray-800">
            ${food.price}
          </span>
          <Link to={`/food/${food.id}`} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}