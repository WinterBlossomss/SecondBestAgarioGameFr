let blob;
let blobs = [];
let zoom = 1;

canvas = document.getElementById("canvas");

function setup() {
    createCanvas(window.innerWidth,window.innerHeight,canvas);
    pixelDensity(1);
    noSmooth();
    blob = new Blob(0, 0, 64);
    for (let i = 0; i < 200; i++) {
        let x = random(-width, width);
        let y = random(-height, height);
        blobs[i] = new Blob(x, y, 16);
    }
}

function drawScreenGrid(spacing, camX, camY, zoom) {
    background(255);
    stroke(220);
    strokeWeight(2);

    const step = spacing;

    const camOffsetX = -camX * zoom + width  / 2;
    const camOffsetY = -camY * zoom + height / 2;

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
    const newzoom = 300 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);

    drawScreenGrid(60, blob.pos.x, blob.pos.y, zoom);

    push();
    translate(width / 2, height / 2);
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
    pop();
}



