import { getStoresService } from "../services/user.service.js";
import { submitRatingService } from "../services/user.service.js";
import {
  getPagination,
  getPaginationMeta,
} from "../utils/pagination.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

export const getStores = async (req, res) => {
  try {
    const result = await getStoresService(req.user.id, req.query);

    const { page, limit } = getPagination(req.query);

    return successResponse(
      res,
      result.stores,
      "Stores fetched successfully",
      200,
      getPaginationMeta(result.total, page, limit)
    );
  } catch (error) {
    console.error(error);

    return errorResponse(res, error.message);
  }
};

export const submitRating = async (req, res) => {
  try {
    const rating = await submitRatingService(req.user.id, req.body);

    return successResponse(
      res,
      rating,
      "Rating submitted successfully"
    );
  } catch (error) {
    console.error(error);

    return errorResponse(res, error.message, 400);
  }
};