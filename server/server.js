const express = require('express');
const app     = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const config  = require('./config.json');
const httpServer = createServer(app);

app.use(express.static(__dirname + '/../client'));
const io = new Server(httpServer, { /* options */ });


io.on('connection', function (socket) {
    console.log("Somebody connected!");

});

const serverPort = config.port;
httpServer.listen(serverPort, function() {
    console.log("Server is listening on port " + serverPort);
});