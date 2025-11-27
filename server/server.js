require("dotenv").config();

const express = require('express');
const app     = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
app.use(express.static(__dirname + '/../client'));
const io = new Server(httpServer, { /* options */ });

//Test console.log
console.log(process.env);

io.on('connection', function (socket) {
    console.log("Somebody connected!");

});

const serverPort = process.env.PORT;
httpServer.listen(serverPort, function() {
    console.log("Server is listening on port " + serverPort);
});