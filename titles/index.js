var letterify = require('letterify');
var strings = 'Lorem ipsum dolor_sit amet, consectetur_adipisicing elit, sed_do eiusmod tempor_incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non_proident, sunt in culpa qui_officia deseruntmollit_anim id est laborum'.split('_');

var strings = [
    "The city is wilder than you think",
    "And kinder than you think.",
    "It is a Valley",
    "and you are a horse in it",
    "It is a house", " and you are a child in it",
    "safe and warm here",
    "in the fire of each other",
    "(text by robert montgomery)"
];


// console.log(strings);
var holder = document.querySelector('h1');

function putText(text, strings){
    holder.classList.remove('letterified');
    holder.textContent = text.toUpperCase();
    letterify('h1');
    queueText(strings);
}

function queueText(strings){
    var next = strings.shift();
    if (next) {
        setTimeout(putText.bind(null, next, strings), 7000);
    }
}

function go(){
    var text = strings.slice();
    putText(text.shift(), text);
}

go();







