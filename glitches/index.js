var remap = window.r = require('re-map');
var clog = require('whir-clog');
var width = window.innerWidth;
var height = window.innerHeight;
clog(width, height)
var canvas = document.createElement('canvas');
var TWOPI = Math.PI * 2;
var start = Date.now() / 10000;

var ctx = window.c = canvas.getContext('2d');

document.body.appendChild(canvas);

var aberrationAmount = 1;
var samplesPerFrame = 32;
var numFrames = 48;
var shutterAngle = 0.5;

var framecount = 0;
var time = 0;

var pix = new Uint8ClampedArray(width * height);
var result = new Uint8ClampedArray(width * height);

function getPixels() {
    var d = ctx.getImageData(0, 0, width, height);
    var buffer = d.data.buffer;
    var buf8 = new Uint8ClampedArray(buffer);
    var data = new Uint32Array(buffer);

    var factor = Date.now() % 255;


    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {
            var value = x * y & factor;

            data[ y * width + x ] = 
                (255 << 24)     | 
                (value << 16)    |
                (value << 8)    |
                value;
        }
    }

    // d.data.set(buf8);

    return d;
}



function draw() {
    // get current frame pixels
    
    // clear canvas
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('width', width + "px");
    canvas.setAttribute('height', height + "px");

    // put previous processed frame as content
    // ctx.putImageData(pix, 0, 0);
    
    sketch();
    
    window.requestAnimationFrame(draw);    
}

function sketch(){
    var now = Date.now() / 10000 - start;
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    var x = (Date.now()*0.2) % width;
    var y = (Date.now()*0.2) % height;


    ctx.arc(
        width/2 + 100 * Math.sin(TWOPI * now), 
        height/2 + 100 * Math.sin(2*TWOPI * now), 
        32, 
        0, 
        Math.PI*2);

    ctx.fill();

}

window.requestAnimationFrame(draw);
