import express from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";

const app: Express = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);

export default app;
