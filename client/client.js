const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


document.oncontextmenu = function () {
    return false;
}

document.addEventListener("DOMContentLoaded", function () {
    drawGridLines();

});

function drawGridLines()
{
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
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
function followMouseMovement()
{

}
let ball = {
    x: 50,
    y: 50,
    radius: 20,
    color: "black"
};

function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function moveBall(e) {
    const rect = canvas.getBoundingClientRect();

    ball.x = e.clientX - rect.left;
    ball.y = e.clientY - rect.top;

    drawBall();
}

window.addEventListener("mousemove", moveBall);

drawBall();