require("dotenv").config();

const express = require('express');
const app     = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);

app.use(express.static('client'));

const io = new Server(httpServer, { /* options */ });

// Variables
let blobs = [];

function Blob(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

// Send all blobs to all clients ~30 times per second
setInterval(heartbeat, 33);

function heartbeat() {
    // For debugging: see how many blobs you are sending
    // console.log('heartbeat, blobs:', blobs.length);
    io.sockets.emit('heartbeat', blobs);
}

io.on('connection', function (socket) {
    console.log('We have a new client: ' + socket.id);

    socket.on('start', function(data) {
        console.log('start from', socket.id, data);
        const blob = new Blob(socket.id, data.x, data.y, data.r);
        blobs.push(blob);
        console.log('blobs after start:', blobs.length);
    });

    socket.on('update', function(data) {
        let blob = null;

        // Find the blob belonging to this socket
        for (let i = 0; i < blobs.length; i++) {
            if (socket.id === blobs[i].id) {
                blob = blobs[i];
                break;  // stop once found
            }
        }

        // If we didn't find a blob, don't crash
        if (!blob) {
            console.warn(`Update for unknown blob: ${socket.id}`, data);
            return;
        }

        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
    });

    socket.on('disconnect', function() {
        console.log('Client has disconnected:', socket.id);
        // Remove blob for this client
        const before = blobs.length;
        blobs = blobs.filter(b => b.id !== socket.id);
        console.log(`blobs before: ${before}, after: ${blobs.length}`);
    });
});

const serverPort = process.env.PORT || 5000;
httpServer.listen(serverPort, function() {
    console.log("Server is listening on port " + serverPort);
});

// If you want to serve the game from /, do NOT override the static index.html.
// Comment this out if you have client/index.html you want to show:
//
// app.get('/', (req, res) => {
//     res.send('Welcome to my static website!');
//
// });
