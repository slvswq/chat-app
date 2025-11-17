import express from "express";
import type { Express } from "express";
import authRoutes from "./routes/auth.route";

const app: Express = express();

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

export default app;
