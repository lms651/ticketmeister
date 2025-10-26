import app from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  logger.info("A user connected:", socket.id);

  socket.on("joinRoom", (venueId, userName) => {
    socket.join(venueId);
    io.to(venueId).emit("chat message", {
      sender: "System",
      message: `${userName} joined the chat`,
      sentTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    })
  })

  socket.on("chat message", ({ venueId, userName, msg }) => {
    io.to(venueId).emit("chat message", {
      sender: userName,
      message: msg,
      sentTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    })
  })

  socket.on("disconnect", () => {
    logger.info("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));