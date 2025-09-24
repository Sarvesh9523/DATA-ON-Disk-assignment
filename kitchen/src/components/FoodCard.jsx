import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <img
        src={food.image}
        alt={food.title}
        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-contain"
      />

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold mb-1 truncate">{food.title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{food.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-md">${food.price}</span>
          <span className="text-lg font-semibold mb-1 truncate">Order it By {food.deliveryDay}</span>
          <Link to={`/food/${food.id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
