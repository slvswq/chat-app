import express from "express";
import type { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getChannelMessages,
  getMessages,
  sendChannelMessage,
  sendMessage,
} from "../controllers/message.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { createMessageSchema } from "../schemas/message.schema";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/:id", getMessages);
router.get("/channel/:id", getChannelMessages);

router.post("/send/:id", validateBody(createMessageSchema), sendMessage);
router.post(
  "/send/channel/:id",
  validateBody(createMessageSchema),
  sendChannelMessage
);

export default router;
