let blob;
let blobs = [];
let zoom = 1;
let socket;

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    pixelDensity(1);
    noSmooth();
    socket = io.connect('http://localhost:3000/');
    blob = new Blob(
        random(width),
        random(height),
        Math.floor(Math.random() * 24) + 8
    );

    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };
    socket.emit('start',data)

    socket.on('heartbeat', function(data) {
        blobs = data;
    });
}




function drawScreenGrid(spacing, camX, camY) {
    background(255);      // white background
    stroke(220);          // light gray lines
    strokeWeight(2);

    const step = spacing;

    const camOffsetX = -camX + width  / 2;
    const camOffsetY = -camY  + height / 2;

    let offsetX = ((camOffsetX % step) + step) % step;
    let offsetY = ((camOffsetY % step) + step) % step;

    offsetX = Math.round(offsetX);
    offsetY = Math.round(offsetY);

    for (let x = offsetX; x < width; x += step) {
        const ix = Math.round(x);
        line(ix, 0, ix, height);
    }

    for (let y = offsetY; y < height; y += step) {
        const iy = Math.round(y);
        line(0, iy, width, iy);
    }
}


function draw() {
    drawScreenGrid(60, blob.pos.x, blob.pos.y);

    translate(width / 2, height / 2);
    const newzoom = 150 / blob.r;
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
    }

    blob.show();
    if (mouseIsPressed) {
        blob.update();
    }
    //blob.constrain();

    let data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    };
    socket.emit('update', data);
}



