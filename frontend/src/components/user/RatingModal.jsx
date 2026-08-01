import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiStar } from "react-icons/fi";

import api from "../../services/api";
import StarRating from "./StarRating";

export default function RatingModal({
  open,
  store,
  onClose,
  onSuccess,
}) {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (store) {
      setRating(store.myRating || 0);
    }
  }, [store]);

  if (!open || !store) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/ratings", {
        storeId: store.id,
        rating,
      });

      toast.success("Rating submitted successfully");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to submit rating"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center gap-3">
            <FiStar className="text-3xl" />

            <div>
              <h2 className="text-2xl font-bold">
                {store.myRating
                  ? "Update Rating"
                  : "Rate Store"}
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                {store.name}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">

          <p className="text-center text-slate-500 mb-6">
            Click on the stars below to rate this store.
          </p>

          <div className="flex justify-center mb-8">
            <StarRating
              rating={rating}
              editable
              onChange={setRating}
            />
          </div>

          <div className="text-center mb-8">
            <span className="inline-flex px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              {rating > 0
                ? `${rating} / 5 Stars`
                : "No Rating Selected"}
            </span>
          </div>

          <div className="flex gap-4">

            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading
                ? "Saving..."
                : "Submit Rating"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}