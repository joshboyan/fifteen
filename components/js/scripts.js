/*jshint esversion: 6,  browser: true, devel: true, strict: true*/
var fetch = require('whatwg-fetch');
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
var entryCount;

// Open an indexedDB database
var dbPromise = idb.open('scores', 1, upgradeDB => {
    // Create object store in the database
    let scores = upgradeDB.createObjectStore('scores');
    // Create keys to query database
    scores.createIndex('timer', 'timer');
    scores.createIndex('moves', 'moves');
}).catch(error => {
    console.error(error);
});


// Access the database
dbPromise.then(db => {
    // Create a new transaction
    tx = db.transaction('scores', 'readwrite');
    // Select the object store to work with
    scores = tx.objectStore('scores', 'readwrite');
    //Get the number of entries n the objectStore
    entryCount = scores.count();
    return entryCount;
}).catch(error => {
    console.error(error);
});

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
refresh();

