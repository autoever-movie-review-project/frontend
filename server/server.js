import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// WebSocket 프로토콜을 활용한 실시간 통신 기능
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", (gameId, userId) => {
    socket.join(gameId);
    console.log(`${userId}이 ${gameId}번 방에 참가`);
  });

  socket.on("gameRoomUpdate", () => {
    console.log("대기방 있는 사람들에게 알림");
    io.emit("gameRoomUpdate");
  });

  socket.on("chatMessage", (gameId, message, userId) => {
    console.log(gameId, message, userId);
    io.to(gameId).emit("chatMessage", userId, message);
  });

  socket.on("leaveRoom", (gameId) => {
    socket.leave(gameId);
  });

  socket.on("ready", (gameId, readylist) => {
    console.log(`${gameId}방 ${readylist}가 준비완료`);
    io.to(gameId).emit("ready", readylist);
  });
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
