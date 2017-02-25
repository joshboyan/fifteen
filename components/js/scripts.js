/*jshint esversion: 6,  browser: true, devel: true, strict: true*/
    var idb = require('idb');
    var gameField = [];
    var compareArr = [
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8],
        [9],
        [10],
        [11],
        [12],
        [13],
        [14],
        [15],
        null
    ];
    var counter = 1;
    var winCount = 0;
    var seconds = 0;
    var minutes = 0;
    var name;
    var time;
    var tx;
    var scores;
    var entryCount;
    // Initial entries in indexedDB
    var game1 = {
        moves: 178,
        timer: 353,
        name: 'MLB',
        key: 0
    };
    var game2 = {
        moves: 307,
        timer: 530,
        name: 'CCK',
        key: 1
    };
    var game3 = {
        moves: 648,
        timer: 609,
        name: 'OGB',
        key: 2
    };
    // Open an indexedDB database
    var dbPromise = idb.open('scores', 1, upgradeDB => {
        // Create object store in the database
        let scores = upgradeDB.createObjectStore('scores');
        // Create keys to query database
        scores.createIndex('timer', 'timer');
        scores.createIndex('moves', 'moves')
            // Add initial entries to indexedDB
        scores.put(game1, 'key1');
        scores.put(game2, 'key2');
        scores.put(game3, 'key3');
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

    function randomBoard() {
        //Ensure game board array is cleared
        gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15]; //Change this back to 1-15
        //Game piece values for new game
        /*gameField = [];
        let startArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        while (startArr.length > 0) {
            //Set picked to a random number from 0 - 14
            let picked = startArr[Math.ceil(Math.random() * startArr.length) - 1];
            //Push the game piece that corresponds with the picked number
            //from the startArr to the gamefield array until all have been placed
            gameField.push(startArr.splice(startArr.indexOf(picked), 1));
        }
        //Set the final space to be blank with null spaceholder
        gameField.push(null);*/
        //Run check to see if the game cannot be won
        if (!boardCheck()) {
            //Call the function recursively if the game cannot be won
            randomBoard();
        }
    }

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
        dbPromise.then(db => {
            tx = db.transaction('scores', 'readwrite');
            scores = tx.objectStore('scores', 'readwrite');
            scores.add(gameStats, `key${entryCount}`);
        }).catch(err => console.log(err));
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
    // Find the number of permutations for the given board. We compare each piece
    // sequencially to all the other pieces that comes after it from left to right
    // add increment our accummulator when the value of the first piece is greater than
    // the second one. Odd number of permutations is unsolvable.
    function boardCheck() {
        // Grab the value of each game piece in the array
        let permutations = gameField.reduce((reducePrev, reduceCurr, reduceIndex, starting) => {
            // Compare that piece to every other piece on the board
            starting.map((mapCurr, mapIndex) => {
                // If the index of the game piece we grabbed with map is less than the index
                // of the game piece we grab with reduce; set the map game piece value to 15.
                // This ensures it is not counted in total permutations regardless of value.
                if (mapIndex < reduceIndex) mapCurr = 15;
                // console.log(reducePrev, parseInt(reduceCurr), parseInt(mapCurr));
                // increment the permutations if the value of our reduce game piece is 
                // greater than the value of our map game piece
                if (parseInt(reduceCurr) > parseInt(mapCurr)) reducePrev++;
            });
            // return total permutations to variable
            return reducePrev;
        }, 0);
        // If the number of permutations is even return true to randomBoard() continue with the game.
        // If the number is odd a new board is generated.
        return permutations % 2 === 0;
    }

    function buildGameBoard() {
        let container = document.getElementById('container');
        let div;
        // Builds each game piece when called
        function gamePieces(id, text) {
            let pieceValue = document.createTextNode(text);
            div.appendChild(pieceValue);
            div.id = id;
            container.appendChild(div);
        }
        // Removes any gamepieces currently on the board
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        gameField.forEach((field, index) => {
            div = document.createElement('div');
            div.className = 'box';
            // Create a game piece for the each element in the random array of 1-15
            if (field) {
                gamePieces(index, field);
                // Create the final blank game piece with a &nbsp; when the array 
                // comes to null at the 16th element
            } else {
                gamePieces(field, String.fromCharCode(160));
            }
        });
    }

    function checkEmpty(targetId) {
        // Position of the blank space
        let blankSpace = gameField.indexOf(null);
        // Check if the blank space is to the left, right, 
        // top or bottom(respectively) of the game piece clicked
        if (blankSpace === targetId - 1 ||
            blankSpace === targetId + 1 ||
            blankSpace === targetId - 4 ||
            blankSpace === targetId + 4) {
            // Increment the counter and update the DOM
            document.getElementById('counter').innerHTML = `Moves:${counter++}`;
            return true;
        }
    }

    function appendEvent() {
        // Get all of the game pieces
        let tiles = document.getElementsByClassName('box');
        // Convert tiles from an array-like object ot an array
        tiles = Array.prototype.slice.call(tiles, 0);
        // Loop through all of the game pieces
        tiles.map(tile => {
            // Add click event to all game pieces
            tile.addEventListener('click', e => {
                // Set targetIdto the game piece the user clicked 
                let targetId = parseInt(e.target.id);
                // If the game piece the user clicked is a legal move
                if (checkEmpty(targetId)) {
                    // Set the blank piece to the targetId the user clicked
                    gameField[gameField.indexOf(null)] = gameField[targetId];
                    // Remove the game piece value from targetId
                    gameField[targetId] = null;
                    console.log(entryCount);
                    // Render game board with new positions
                    buildGameBoard();
                    // Winning condition check if pieces are in numerical order
                    winCheck();
                    // Call function recursivley until winning condition is met
                    appendEvent();
                }

            });
        })
    }

    function removeTimer() {
        // Remove old timer and create a p element to hold the new one
        // created in gameTimer
        document.getElementById('timer').remove(timer);
        let newTimer = document.createElement('p');
        newTimer.id = 'timer';
        document.getElementById('gameStats').appendChild(newTimer);
    }

    function gameTimer() {
        let timer = document.getElementById('timer');
        // set timer to 0
        seconds = 0;
        minutes = 0;
        // Get initial time value
        let start = new Date().getTime();
        window.setInterval(function() {
            //Find how much time has elasped between ow and starting time
            time = new Date().getTime() - start;
            // Set the timer interval to 1000ms === 1s
            seconds = Math.round((time / 1000) + 0.5);
            // Ensure seconds always appear in 2 digit format
            if (seconds > 9) {
                timer.innerHTML = `${minutes}:${seconds}`;
            } else {
                timer.innerHTML = `${minutes}:0${seconds}`;
            }
            // Increment the minutes and set seconds to 0 after 59
            if (seconds > 59) {
                minutes++;
                seconds = 0;
                // Restart timer
                start = new Date().getTime();
            }
            return time;
            // Set the timer interval to 1000ms === 1s
        }, 1000);
    }

    function buildScoreBoard(type, board) {
        // Open up the database
        dbPromise.then(function(db) {
            // Create a transaction
            let tx = db.transaction('scores');
            // open up the object store
            let store = tx.objectStore('scores');
            // Specify the index to use
            let myIndex = store.index(type);
            // Get all the entries ordered by the index

            return myIndex.getAll();
        }).then(function(rankings) {
            // Clean everything of the board
            board = document.getElementById(board);
            while (board.hasChildNodes()) {
                board.removeChild(board.lastChild);
            }
            // Format each database key into an html entry for the score boards
            rankings.forEach(function(rank, index) {
                let node = document.createElement('div');
                console.log(rank.key);
                console.log(entryCount);
                if (entryCount > 3 && rank.key == (entryCount - 1)) {
                    node.classList.add('latest');
                }
                node.innerHTML = `<span>${index+1})</span><span>${rank.name}</span><span>${rank[type]}</span>`;
                board.appendChild(node);
            });

        }).catch(error => {
            console.error(error);
        });
    }

    function openTimeScoreBoard() {
        buildScoreBoard('timer', 'timeEntries');
        document.getElementById('timeScoreBoard').classList.add('open');
    }

    function openMovesScoreBoard() {
        buildScoreBoard('moves', 'moveEntries');
        document.getElementById('movesScoreBoard').classList.add('open');
    }
    // Restart the game
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

    // Click events to open and close UI overlays
    document.getElementById('instructionsTrigger').addEventListener('click', function() {
        document.getElementById('instructions').classList.remove('close-instructions');
    });
    document.getElementById('closeInstructions').addEventListener('click', function() {
        document.getElementById('instructions').classList.add('close-instructions');
    });
    document.getElementById('refresh').addEventListener('click', function() {
        refresh();
    });
    document.getElementById('timeScores').addEventListener('click', function() {
        openTimeScoreBoard();

    });
    document.getElementById('exitTimes').addEventListener('click', function() {
        document.getElementById('timeScoreBoard').classList.remove('open');
    });
    document.getElementById('exitTimesWin').addEventListener('click', function() {
        document.getElementById('timeScoreBoard').classList.remove('open');
        openMovesScoreBoard();
    });
    document.getElementById('moveScores').addEventListener('click', function() {
        openMovesScoreBoard();

    });
    document.getElementById('exitMoves').addEventListener('click', function() {
        document.getElementById('movesScoreBoard').classList.remove('open');
    });
    document.getElementById('exitMovesWin').addEventListener('click', function() {
        document.getElementById('movesScoreBoard').classList.remove('open');
        refresh();
    });
    document.getElementById('info').addEventListener('click', function() {
        document.getElementById('infoBoard').classList.add('open');
    });
    document.getElementById('exitInfo').addEventListener('click', function() {
        document.getElementById('infoBoard').classList.remove('open');
    });
    document.getElementById('exitYouWin').addEventListener('click', function() {
        document.getElementById('youWin').classList.remove('open');
        document.getElementById('yourName').classList.add('open');
    });
    document.getElementById('exitYourName').addEventListener('click', function() {
        document.getElementById('yourName').classList.remove('open');
        name = document.getElementsByTagName('input')[0].value;
        winSequence();
    });
