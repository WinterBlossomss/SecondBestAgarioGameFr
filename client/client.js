document.oncontextmenu = function () {
    return false;
}
let socket;

let height = 6;
let width = 6;


document.addEventListener("DOMContentLoaded", function () {
    //socket = io.connect("http://localhost:3000/");

    let blob = new Blob(random(width), random(height), Math.floor(Math.random() * 24) + 8);
    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };
    // socket.emit('start', data);
    //
    // socket.on('heartbeat', function(data) {
    //     blobs = data;
    // });
});









