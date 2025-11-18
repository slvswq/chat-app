import express, { type Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getUsers, getMe } from "../controllers/users.controller";

const router: Router = express.Router();

router.use(protectRoute);

router.get("/", getUsers);
router.get("/me", getMe);

export default router;
