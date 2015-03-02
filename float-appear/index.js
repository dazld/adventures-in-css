var root = document.querySelector('#stage');
var c = 0;
var numBlocks = 30;


function makeBlock(){
    var div = document.createElement('div');
    div.className = 'block';
    div.textContent = c++ % 10;
    // div.style.width = (((Math.random() * 20 ) + 1) << 0) + "vw";
    // div.style.height = (((Math.random() * 20 ) + 1) << 0) + "vh";
    return div;
}



function go(){
    root.appendChild(makeBlock());
    if (c < numBlocks) {
        setTimeout(go, 700);
    }
}

go();
