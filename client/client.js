const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameCanvas = document.getElementById("gameCanvas");
const ctxGame = gameCanvas.getContext("2d");

document.oncontextmenu = function () {
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
   canvas.width= gameCanvas.width = document.body.clientWidth;
    canvas.height= gameCanvas.height = document.body.clientHeight;
    drawGridLines();
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
loop();
function drawGridLines()
{

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
