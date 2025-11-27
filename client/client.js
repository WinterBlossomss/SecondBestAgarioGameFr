const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameCanvas = document.getElementById("gameCanvas");
const ctxGame = gameCanvas.getContext("2d");

document.oncontextmenu = function () {
    return false;
}
let socket;
let blob;
let zoom = 1;
let height = 6;
let width = 6;
let blobs = [];

document.addEventListener("DOMContentLoaded", function () {
   canvas.width= gameCanvas.width = document.body.clientWidth;
    canvas.height= gameCanvas.height = document.body.clientHeight;
    drawGridLines();
    socket = io.connect("http://localhost:3000/");

    let blob = new Blob(random(width), random(height), Math.floor(Math.random() * 24) + 8);
    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };
    socket.emit('start', data);

    socket.on('heartbeat', function(data) {
        blobs = data;
    });
});

let x = 400, y = 300;

function loop() {

    ctxGame.clearRect(0, 0, gameCanvas.width, gameCanvas.height);


    ctxGame.beginPath();
    ctxGame.arc(x, y, 20, 0, Math.PI * 2);
    ctxGame.fillStyle = "blue";
    ctxGame.fill();

    requestAnimationFrame(loop);
}
gameCanvas.addEventListener("mousemove", e => {
    const rect = gameCanvas.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
});
//loop();

function drawGridLines() {

    // canvas.style.border = "1px solid red"
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";

    let offsetX = Math.floor(canvas.width / 50);
    let offsetY = Math.floor(canvas.height / 25);

    for (let x = offsetX; x < canvas.width; x += offsetX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x,canvas.height);
    }

    for (let y = offsetY; y <canvas.height; y += offsetY) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();

    return canvas;
}


function draw() {
    background(0);
    console.log(blob.pos.x, blob.pos.y);

    translate(width / 2, height / 2);
    let newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (let i = blobs.length - 1; i >= 0; i--) {
        let id = blobs[i].id;
        if (id.substring(2, id.length) !== socket.id) {
            fill(0, 0, 255);
            ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

            fill(255);
            textAlign(CENTER);
            textSize(4);
            text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r);
        }
        // blobs[i].show();
        // if (blob.eats(blobs[i])) {
        //   blobs.splice(i, 1);
        // }
    }

    blob.show();
    if (mouseIsPressed) {
        blob.update();
    }
    blob.constrain();

    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };
    socket.emit('update', data);
}
socket.on("connect", () => {
    console.log(socket.id);
})









