import {
  FiMapPin,
  FiStar,
  FiEdit3,
} from "react-icons/fi";

import StarRating from "./StarRating";

export default function StoreCard({
  store,
  onRate,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 line-clamp-2">
          {store.name}
        </h2>

        <div className="flex items-center gap-2 text-slate-500 mt-3">
          <FiMapPin className="text-blue-500" />
          <span>{store.address}</span>
        </div>

        <div className="border-t my-5"></div>

        {/* Average Rating */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500">
              Average Rating
            </p>

            <div className="flex items-center gap-2 mt-2">
              <FiStar className="text-yellow-500 fill-yellow-400" />

              <span className="text-xl font-bold">
                {store.averageRating.toFixed(1)}
              </span>

              <span className="text-slate-400 text-sm">
                / 5
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            {store.totalRatings} Ratings
          </span>
        </div>

        {/* My Rating */}
        <div className="mt-6">
          <p className="text-sm text-slate-500 mb-2">
            My Rating
          </p>

          {store.myRating ? (
            <div className="flex items-center gap-3">
              <StarRating rating={store.myRating} />

              <span className="font-semibold text-slate-700">
                {store.myRating}/5
              </span>
            </div>
          ) : (
            <span className="text-slate-400">
              Not Rated Yet
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-6 py-4">
        <button
          onClick={() => onRate(store)}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
        >
          <FiEdit3 />

          {store.myRating
            ? "Update Rating"
            : "Rate Store"}
        </button>
      </div>
    </div>
  );
}