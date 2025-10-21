// import app from "./app.js";

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import app from "./app.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Attach Socket.IO
const io = new Server(server, {
  cors: { origin: "*" }
});

// Serve public folder (for chat client)
app.use(express.static("public"));

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", (venueId, userName) => {
    socket.join(venueId);
    io.to(venueId).emit("chat message", {
      sender: "System",
      message: `${userName} joined the chat`,
      sentTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
  });

  socket.on("chat message", ({ venueId, userName, msg }) => {
    io.to(venueId).emit("chat message", {
      sender: userName,
      message: msg,
      sentTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));