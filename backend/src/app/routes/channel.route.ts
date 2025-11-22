import express, { type Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getChannels, createChannel } from "../controllers/channel.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { channelSchema } from "../schemas/channel.schema";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/", getChannels);

router.post("/create", validateBody(channelSchema), createChannel);

export default router;
