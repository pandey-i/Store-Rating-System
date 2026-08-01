import express from "express";

import {
  register,
  login,
  getProfile,
  changePassword,
} from "../controllers/auth.controller.js";

import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
} from "../validators/auth.validator.js";

import { validate } from "../middleware/validate.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  login
);

// Get Logged-in User Profile
router.get(
  "/profile",
  verifyToken,
  getProfile
);

// Change Password
router.put(
  "/change-password",
  verifyToken,
  changePasswordValidation,
  validate,
  changePassword
);

export default router;