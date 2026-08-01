import express from "express";

import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import { getDashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("OWNER"),
  getDashboard
);

export default router;