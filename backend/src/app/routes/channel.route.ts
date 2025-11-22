import express, { type Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getChannels,
  createChannel,
  updateChannelInfo,
  addChannelMembers,
  deleteChannelMember,
  deleteChannel,
} from "../controllers/channel.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import {
  channelInfoSchema,
  createChannelSchema,
  addChannelMembersSchema,
} from "../schemas/channel.schema";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/", getChannels);

router.post("/create", validateBody(createChannelSchema), createChannel);
router.post(
  "/:id/members",
  validateBody(addChannelMembersSchema),
  addChannelMembers
);

router.patch("/:id", validateBody(channelInfoSchema), updateChannelInfo);

router.delete("/:id/members/:memberId", deleteChannelMember);
router.delete("/:id", deleteChannel);

export default router;
