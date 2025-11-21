import "dotenv/config";
import http from "http";

import app from "./app/app";
import { connectDB } from "./app/lib/db";
import { initSocket } from "./app/lib/socket";

const PORT = process.env.PORT;

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  await connectDB();
});
