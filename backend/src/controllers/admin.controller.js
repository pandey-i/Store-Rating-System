import {
  createUserService,
  createStoreService,
  getDashboardStatsService,
  getUsersService,
  getStoresService,
} from "../services/admin.service.js";

import {
  getPagination,
  getPaginationMeta,
} from "../utils/pagination.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);

    return successResponse(
      res,
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      "User created successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const createStore = async (req, res) => {
  try {
    const store = await createStoreService(req.body);

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const stats = await getDashboardStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await getUsersService(req.query);
    const { page, limit } = getPagination(req.query);

    return successResponse(
      res,
      result.users,
      "Users fetched successfully",
      200,
      getPaginationMeta(result.total, page, limit)
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, error.message);
  }
};


export const getStores = async (req, res) => {
  try {
    const result = await getStoresService(req.query);
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
