(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    var factor = Date.now() % 4096;


    for (var y = 0; y < height; ++y) {
        for (var x = 0; x < width; ++x) {

            var value = x * y & factor;

            data[ y * width + x ] = 
                (255 << 24)     | 
                (value << 16)   |
                (value << 8)    |
                value;
        }
    }

    d.data.set(buf8);

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
    // var iData = new ImageData(width, height);
    // iData.data = pix;
    // ctx.putImageData(iData, 0, 0);
    
    sketch();
    // pix = getPixels();
    // ctx.putImageData(pix, 0, 0);
    
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
        Math.abs(Math.log((Date.now()*0.2) % 10)) * 3, 
        0, 
        Math.PI*2);

    ctx.fill();

}

draw();

},{"re-map":2,"whir-clog":3}],2:[function(require,module,exports){
/*
 * re-map
 * https://github.com/technicolorenvy/re-map
 *
 * Copyright (c) 2013 Joseph (Jos) Smith
 * Licensed under the GNU GENERAL PUBLIC license.
 */

// @param {Number} value 
// @param {Number} istart
// @param {Number} istop
// @param {Number} ostart
// @param {Number} ostop

module.exports = function reMap(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};
},{}],3:[function(require,module,exports){
module.exports = (function() {

	var startTime = Date.now();

	return function clog() {
		var logTime = ((Date.now() - startTime) / 1000).toFixed(3) + 's - ';
		var partialConsole = console.log.bind(console, logTime);
		return partialConsole.apply(console, arguments);
	};

})();
},{}]},{},[1]);
