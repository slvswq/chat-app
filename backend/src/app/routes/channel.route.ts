import express, { type Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getChannels,
  createChannel,
  updateChannelInfo,
} from "../controllers/channel.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import {
  channelInfoSchema,
  createChannelSchema,
} from "../schemas/channel.schema";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/", getChannels);

router.post("/create", validateBody(createChannelSchema), createChannel);

router.patch("/:id", validateBody(channelInfoSchema), updateChannelInfo);

export default router;
