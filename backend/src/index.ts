import express from "express";
import authRoutes from "./routes/auth.route";
import "dotenv/config";
import { connectDB } from "./lib/db";

const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
  connectDB();
});
