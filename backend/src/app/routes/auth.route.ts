import express from "express";
import type { Router } from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { protectRoute } from "../middleware/auth.middleware";
import {
  createUserSchema,
  baseUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

const router: Router = express.Router();

router.post("/signup", validateBody(createUserSchema), signup);
router.post("/login", validateBody(baseUserSchema), login);
router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  validateBody(updateUserSchema),
  updateProfile
);

export default router;
