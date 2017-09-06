/*jshint esversion: 6,  browser: true, devel: true, strict: true*/
require('whatwg-fetch');
var idb = require('idb');
var gameField = [];
var compareArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
var counter = 1;
var winCount = 0;
var seconds = 0;
var minutes = 0;
var name;
var time;
var tx;
var scores;
var offline;
var entryCount;
var addOfflineScores = false;

/* Hide URL paramenter if user hits enter after inputting initials
if(typeof window.history.pushState == 'function') {
    window.history.pushState({}, "Hide", "https://fifteen-puzzle.herokuapp.com");
}*/

// Start/Restart the game
function refresh() {
    randomBoard();
    buildGameBoard();
    appendEvent();
    removeTimer();
    gameTimer();
    // Set the scoreboard "x's" to just close overlay
    document.getElementById('exitTimesWin').style.display = 'none';
    document.getElementById('exitTimes').style.display = 'block';
    document.getElementById('exitMovesWin').style.display = 'none';
    document.getElementById('exitMoves').style.display = 'block';
}

// Start the initial game
refresh();
// Initialize data stores in browser
indexedDB();
// Get scores from mongoDB
mongo();