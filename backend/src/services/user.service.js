import { getStores } from "../repositories/user.repository.js";
import { getPagination } from "../utils/pagination.js";
import { submitRating } from "../repositories/user.repository.js";

export const getStoresService = async (userId, query) => {
  const { skip, limit } = getPagination(query);

  return getStores({
    userId,
    skip,
    limit,
    search: query.search || "",
    sortBy: query.sortBy || "createdAt",
    order: query.order || "desc",
  });
};

export const submitRatingService = async (userId, ratingData) => {
  const { storeId, rating } = ratingData;

  return submitRating({
    userId,
    storeId: Number(storeId),
    rating: Number(rating),
  });
};