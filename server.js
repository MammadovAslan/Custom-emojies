const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connect", () => console.log("Socket connected"));

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    const { userToCall, signalData, from, name } = data;

    id.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on("answerCall", (data) => {
    const { to, signal } = data;
    io.to(to).emit("callAccepted", signal);
  });
});

server.listen(PORT, () => console.log("Server Sarted on Port " + PORT));
