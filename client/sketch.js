const canvas = document.getElementById("canvas");
let blob;

let blobs = [];
let zoom = 1;

let width = canvas.width;
let height = canvas.height;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    blob = new Blob(0, 0, 64);
    for (let i = 0; i < 200; i++) {
        let x = random(-width, width);
        let y = random(-height, height);
        blobs[i] = new Blob(x, y, 16);
    }
}
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
    drawGridLines();
    translate(width / 2, height / 2);
    let newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (let i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);
        }
    }

    blob.show();
    blob.update();
}