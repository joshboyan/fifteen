/*
* This file contains functions that check for winning conditions and 
* execute the win sequence if met
*/

function winCheck() {
    // Get the initial count from the DB
    if (winCount === 0) {
        entryCount = entryCount.request.result;
    }
    //variable to store the number of elements that match between
    //compareArr and gameField
    let matchCounter = 0;
    // Check that each element in the gameField array matches
    // the compareArr winning condition            
    compareArr.forEach((element, index) => {
        if (parseInt(element) === parseInt(gameField[index])) {
            matchCounter++;
        }
    });
    if (matchCounter === 15) {
        // Display the screen that says you win and enter name form
        document.getElementById('youWin').classList.add('open');
        document.getElementById('name').autofocus = true;
        // Script to autofocus cursor in browsers without native support;
        if (!('autofocus' in document.createElement('input'))) {
            document.getElementById('name').focus();
        }
    }
    // Increment the counts
    winCount++;
}

function winSequence() {
    // Set the details of the game
    let gameStats = {
        moves: counter,
        timer: Math.floor(time / 1000),
        name: name,
        key: entryCount
    };
    console.log('You Win!!');
    removeTimer();
    // Initialize a new game
    counter = 0;
    document.getElementById('counter').innerHTML = 'Moves:0';
    

// Add the info from this game to the DB
    fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameStats)
    }).then(() =>{
        console.log("The following entry has been made to mongo: ", gameStats);
    }).catch(err => {
        // If user is offline add the scores to indexed db
        console.error("There was a connection problem, Score is being stored locally", err);
        dbPromise.then(db => {
            // This updates the scores for the in-browser scoreboards
            // while the user is offline
            tx = db.transaction('scores', 'readwrite');
            scores = tx.objectStore('scores', 'readwrite');
            scores.add(gameStats, `key${entryCount}`);
            // This stores the scores for upload to mongo when the
            // user has a connection
            tx = db.transaction('offline', 'readwrite');
            scores = tx.objectStore('offline', 'readwrite');
            scores.add(gameStats, `key${entryCount}`);
        }).catch(err => console.error(err)); 
    });  
    // Increment the counter for the idb key
    entryCount++;
    // Set timeScoreBoard "x" to open movesScoreBoard
    document.getElementById('exitTimes').style.display = 'none';
    document.getElementById('exitTimesWin').style.display = 'block';
    // Set movesScoreBoard "x" to restart the game
    document.getElementById('exitMoves').style.display = 'none';
    document.getElementById('exitMovesWin').style.display = 'block';
    openTimeScoreBoard();
    
}