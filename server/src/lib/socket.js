import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const userSocketMap = {}

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId]
}


io.on("connection", (socket) => {
console.log("A user connected", socket.id);

const userId = socket.handshake.query.userId; // query.userId is coming from useAuthStore.js
if(userId) userSocketMap[userId] = socket.id;

io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Object.keys() contains all the authenticated and online userIds.

socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };