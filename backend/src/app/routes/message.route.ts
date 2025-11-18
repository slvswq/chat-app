import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages } from "../controllers/message.controller";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/:id", getMessages);

export default router;
