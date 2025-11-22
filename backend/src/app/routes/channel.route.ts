import express, { type Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channel.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { channelSchema } from "../schemas/channel.schema";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/", getChannels);

router.post("/create", validateBody(channelSchema), createChannel);

router.put("/:id", validateBody(channelSchema), updateChannel);

router.delete("/:id", deleteChannel);

export default router;
