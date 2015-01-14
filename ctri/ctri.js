var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var slider = document.getElementById('rows');
var compmode = document.getElementById('compmode');

function setup(){
  
  canvas.style.width = window.innerWidth;
  canvas.style.height = window.innerHeight;
  canvas.setAttribute('width', window.innerWidth+'px');
  canvas.setAttribute('height', window.innerHeight+'px');
  
  var devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;

  // upscale the canvas if the two ratios don't match
  if (devicePixelRatio !== backingStoreRatio) {

    var oldWidth = canvas.width;
    var oldHeight = canvas.height;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    // now scale the context to counter
    // the fact that we've manually scaled
    // our canvas element
    ctx.scale(ratio, ratio);
  }
}



var c1 = [255,0,0];
var c2 = [0,255,0];
var c3 = [0,0,255];

var lch = [
  colorSpace.rgb.hsv(c1),
  colorSpace.rgb.hsv(c2),
  colorSpace.rgb.hsv(c3)
];

function getHue(col){
  return col[0];
}

/* 
http://www.stuartdenman.com/improved-color-blending/
d = h2 - h1
if (h1 > h2) then swap(h1, h2), d = -d, f = 1 - f
if (d > 180) then h1 = h1 + 360, h = ( h1 + f * (h2 - h1) ) mod 360
if (d <= 180) then h = h1 + f * d

*/

function scale(x,y,max){
  var fX = x/max;
  var fY = y/max;
  var h;

  var hues = [getHue(lch[0]), getHue(lch[1])];
  // var h3 = getHue(lch[2]);
  var d =  hues[1] - hues[0];
  console.log(fX, d,hues)
  if (hues[0] > hues[1]) {
    hues.reverse();
    d = -d;
    fX = 1 - fX;
  }

  if (d > 180) {
    hues[0] += 360;
    h = ( hues[0] + fX * (hues[1]-hues[0])) % 360;
  } else if (d <= 180) {
    h = hues[0] + fX * d;
  }

  var rgb = colorSpace.hsv.rgb([h, lch[0][1], lch[0][2] ]);

  return getRGBA(rgb);
  

}

function getRGBA(rgb){
  return ['rgba(' + rgb[0],rgb[1],rgb[2],'1)'].join();
}


// this is still quite raw, ideally should be scaling
// between three arbitrary colours

function scale2(x,y,max){
  
  var rX = (x/max);
  var rY = (y/max);
  
  var invRX = Math.abs(rX - 1)
  var invRY = Math.abs(rY - 1)
  
  var red = (255 * invRX ) >> 0;
  var green = (255 * rY) >> 0;
  var blue = (255 * invRY) >> 0;
  
  return ['rgba(' + red, green, blue,'1)'].join();
}

function draw (){
  var w = window.innerWidth;
  var h = window.innerHeight;
  
  var rows = slider.value;
  var x = 0;
  var y = 40;
  var fill;
  
  for(var i = 0; i < rows; i++){

    x = (w / 2) - (i * 10);
    y = y + 19;

    for(var t = 0; t<=i; t++){
      x = x + 22;
      fill = scale(i,t,rows);
      drawHexagon(ctx, x, y, fill);
    }
  }
}

// https://gist.github.com/zackthehuman/1867663
var hexHeight,
    hexRadius,
    hexRectangleHeight,
    hexRectangleWidth,
    hexagonAngle = 0.523598776, // 30 degrees in radians
    sideLength = 18,
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

function drawHexagon(canvasContext, x, y, fill) {           
  var fill = fill || false;

  canvasContext.beginPath();
  // canvasContext.globalCompositeOperation = 'source-over';
  // canvasContext.globalCompositeOperation = compmode.value;
  canvasContext.strokeStyle = "rgba(0,0,0,0.5)";
  canvasContext.lineWidth = 1;
  canvasContext.moveTo(x + hexRadius, y);
  canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
  canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
  canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
  canvasContext.lineTo(x, y + sideLength + hexHeight);
  canvasContext.lineTo(x, y + hexHeight);
  canvasContext.closePath();

  if(fill) {
    canvasContext.fillStyle = fill;
    canvasContext.fill();
  } 
  canvasContext.stroke();
}


document.body.appendChild(canvas);

function run(){
  setup();
  draw();
}

slider.addEventListener('input', run);
window.addEventListener('resize', run);
compmode.addEventListener('input', run);

run();
