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
var entryCount;
var addOfflineScores = false;

// Open an indexedDB database
var dbPromise = idb.open('scores', 1, upgradeDB => {
    // Create object store in the database
    let scores = upgradeDB.createObjectStore('scores');
    // Create keys to query database
    scores.createIndex('timer', 'timer');
    scores.createIndex('moves', 'moves');
    // Create store to hold scores from offline use
    let offline = upgradeDB.createObjectStore('offline');
}).catch(error => {
    console.error(error);
});

if(addOfflineScores){
    dbPromise.then(db => {
        // Create a transaction
        let tx = db.transaction('offline');
        // open up the object store
        let store = tx.objectStore('offline');
        // Specify the index to use
        let myIndex = store.index(type);
        // Get all the entries ordered by the index
        return myIndex.getAll();
    }).then(offline => {
        fetch('/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offline)
        })
            console.log("The following entry has been made to mongo: ", offline);
    }).catch(err => {
        console.error("There was an error updating mongo with offline scores. ", err)
    }); 
}


// Get the number of score entries for internal use
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