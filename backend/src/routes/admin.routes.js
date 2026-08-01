import express from "express";

import {
  createUser,
  createStore,
  getDashboard,
  getUsers,
  getStores,
} from "../controllers/admin.controller.js";

import {
  createUserValidation,
  createStoreValidation,
} from "../validators/admin.validator.js";

import { validate } from "../middleware/validate.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// Create a new User (ADMIN / OWNER / USER)
router.post(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  createUserValidation,
  validate,
  createUser
);

// Create a new Store
router.post(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  createStoreValidation,
  validate,
  createStore
);

// Dashboard Statistics
router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("ADMIN"),
  getDashboard
);

// Get All Users
router.get(
  "/users",
  verifyToken,
  authorizeRoles("ADMIN"),
  getUsers
);

// Get All Stores
router.get(
  "/stores",
  verifyToken,
  authorizeRoles("ADMIN"),
  getStores
);

export default router;