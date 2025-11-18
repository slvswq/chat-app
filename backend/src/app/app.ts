import express from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import userRoutes from "./routes/users.route";

const app: Express = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/message", messageRoutes);

export default app;
