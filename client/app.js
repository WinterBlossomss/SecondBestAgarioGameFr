const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
let playerName;
let playerNameInput = document.getElementById('playerNameInput');
let socket;

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

c.width = screenWidth; c.height = screenHeight;

let KEY_ENTER = 13;


const app     = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


function startGame() {
    playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '');
    document.getElementById('gameAreaWrapper').style.display = 'block';
    document.getElementById('startMenuWrapper').style.display = 'none';
    socket = io;
    SetupSocket(socket);
    animloop();
}

// check if nick is valid alphanumeric characters (and underscores)
function validNick() {
    let regex = /^\w*$/;
    console.log('Regex Test', regex.exec(playerNameInput.value));
    return regex.exec(playerNameInput.value) !== null;
}

window.onload = function() {
    'use strict';

    let startBtn = document.getElementById('startButton'),
        nickErrorText = document.querySelector('#startMenu .input-error');

    startBtn.onclick = function () {

        // check if the nick is valid
        if (validNick()) {
            startGame();
        } else {
            nickErrorText.style.display = 'inline';
        }
    };

    playerNameInput.addEventListener('keypress', function (e) {
        let key = e.key || e.code;

        if (key === KEY_ENTER) {
            if (validNick()) {
                startGame();
            } else {
                nickErrorText.style.display = 'inline';
            }
        }
    });
};




function SetupSocket(socket) {


}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function animloop(){
    requestAnimFrame(animloop);
    gameLoop();
}

function gameLoop() {

}

window.addEventListener('resize', function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    c.width = screenWidth;
    c.height = screenHeight;
}, true);