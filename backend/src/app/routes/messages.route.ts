import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages, sendMessage } from "../controllers/message.controller";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/:id", getMessages);

router.post("/send/:id", sendMessage);

export default router;
