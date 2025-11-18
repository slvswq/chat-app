import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/message.controller";

const router: Router = express.Router();

router.get("/users", protectRoute, getUsers);

export default router;
