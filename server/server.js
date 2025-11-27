require("dotenv").config();

const express = require('express');
const app     = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
let path = require("path");
const url = require("url");

app.use(express.static('client'));

const io = new Server(httpServer, { /* options */ });

//Test console.log
console.log(process.env);


//Variables
let blobs = [];

function Blob(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

setInterval(heartbeat, 33);

function heartbeat() {
    io.sockets.emit('heartbeat', blobs);
}

io.on('connection', function (socket) {
    console.log('We have a new client: ' + socket.id);

    socket.on('start', function(data) {
        console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
        let blob = new Blob(socket.id, data.x, data.y, data.r);
        blobs.push(blob);
    });

    socket.on('update', function(data) {
        //console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
        let blob;
        for (let i = 0; i < blobs.length; i++) {
            if (socket.id === blobs[i].id) {
                blob = blobs[i];
            }
        }
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
    });

    socket.on('disconnect', function() {
        console.log('Client has disconnected');
    });

});

const serverPort = process.env.PORT || 5000;
httpServer.listen(serverPort, function() {
    console.log("Server is listening on port " + serverPort);
});

app.get('/', (req, res) => {
    res.send('Welcome to my static website!');
});