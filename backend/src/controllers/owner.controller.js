import { getDashboardService } from "../services/owner.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

export const getDashboard = async (req, res) => {
  try {
    const {
      sortBy = "name",
      order = "asc",
    } = req.query;

    const dashboard = await getDashboardService(
      req.user.id,
      sortBy,
      order
    );

    return successResponse(
      res,
      dashboard,
      "Owner dashboard fetched successfully"
    );
  } catch (error) {
    console.error(error);

    return errorResponse(res, error.message);
  }
};