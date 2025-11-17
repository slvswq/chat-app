import express from "express";
import type { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { createUserSchema } from "../schemas/user.schema";

const router: Router = express.Router();

router.post("/signup", validateBody(createUserSchema), signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
