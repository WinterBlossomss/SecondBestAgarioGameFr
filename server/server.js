import { v4 as uuidv4 } from 'uuid';

const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static('public'));  // serve files from public/ directory
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const SAT = require('sat');
const uuid = require("uuid");

io.engine.generateId = (req) => {
    return uuidv4(); // must be unique across all Socket.IO servers
}


httpServer.listen(3000);

console.log(`Server started`);