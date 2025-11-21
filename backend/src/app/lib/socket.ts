import { Server } from "socket.io";
import http from "http";

let io: Server;
// used to store online users
const userSocketMap: Record<string, string> = {};

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: [process.env.CORS_ORIGIN || ""],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId as string] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete userSocketMap[userId as string];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
