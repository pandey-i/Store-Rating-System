import express from "express";

import { verifyToken } from "../middleware/auth.middleware.js"
import { authorizeRoles } from "../middleware/role.middleware.js";

import { getStores } from "../controllers/user.controller.js";
import { submitRating } from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/stores",
  verifyToken,
  authorizeRoles("USER"),
  getStores
);

router.post(
  "/ratings",
  verifyToken,
  authorizeRoles("USER"),
  submitRating
);

export default router;