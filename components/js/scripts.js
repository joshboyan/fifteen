/*You can have as many different javascript files as you like. 
They will all be compiled to ES5, concantenated and linted for the dev build and
minified with comments removed for the dist build.*/
'use strict';
'esversion: 6';
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
var start = new Date().getTime();
var seconds = 0;
var minutes = 0;

function randomBoard() {
    //Ensure game board array is cleared
    gameField = [];
    //Game piece values for new game
    let startArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    while (startArr.length > 0) {
        //Set picked to a random number from 0 - 14
        let picked = startArr[Math.ceil(Math.random() * startArr.length) - 1];
        //Push the game piece that corresponds with the picked number
        //from the startArr to the gamefield array until all have been placed
        gameField.push(startArr.splice(startArr.indexOf(picked), 1));
    }
    //Set the final space to be blank with null spaceholder
    gameField.push(null);
    //Run check to see if the game cannot be won
    if (!boardCheck()) {
        //Call the function recursively if the game cannot be won
        randomBoard();
    }
}

function winCheck() {
    //Check that each element in the gameField array matches
    //the compareArr winning condition
    for (let element in compareArr) {
        if (compareArr[element] === gameField[element]) {
            console.log(gameField[element]);
        }
        //console.log(gameField[i])
        //console.log(compareArr[i])
    }
}
// Find the number of permtations for the given board. We compare each piece 
// sequencialy to all the other pieces that comes after it from left to right
// add increment our accummulator when the value of the first piece is greater than
// the second one. Odd number of permutations is unsolvable.
function boardCheck() {
    // Grab the value of each game piece in the array
    let permutations = gameField.reduce((reducePrev, reduceCurr, reduceIndex, starting) => {
        // Compare that piece to every other piece on the board
        starting.map((mapCurr, mapIndex) => {
            // If the index of the game piece we grabbed with map is less than the index
            // of the game piece we gradd with reduce; set the map game piece value to 15.
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
    if (permutations % 2 === 0) {
        return true;
    } else {
        return false;
    }
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
        // Create a game piece for the each element in the random arry af 1-15
        if (field) {
            gamePieces(index, field);
            // Create the final blank game piece with a &nbsp; when the array 
            // comes to null at the 16th element
        } else {
            gamePieces(field, String.fromCharCode(160));
        }
    });
    // Start the game timer
    gameTimer();
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
        document.getElementById('counter').innerHTML = `Moves: ${counter++}`;

        return true;
    }
}

function appendEvent() {
    // Get all of the game pieces
    let tiles = document.getElementsByClassName('box');
    // Loop through all of the game pieces
    for (let i = 0; i < tiles.length; i++) {
        // Add click event to all game pieces
        tiles[i].addEventListener('click', e => {
            // Set targetIdto the game piece the user clicked 
            var targetId = parseInt(e.target.id);
            // If the game piece the user clicked is a legal move
            if (checkEmpty(targetId)) {
                // Set the blank piece to the targetId the user clicked
                gameField[gameField.indexOf(null)] = gameField[targetId];
                // Remove the game piece value from targetId
                gameField[targetId] = null;
                // Render game board with new positions
                buildGameBoard();
                // Winning condition check if pieces are in numerical order
                winCheck();
                // Call function recursivley until winning condition is met
                appendEvent();
            }

        });
    }
}

function gameTimer() {
    let timer = document.getElementById("timer");
    window.setInterval(function() {
        //Find how much time has elasped between ow and starting time
        let time = new Date().getTime() - start;
        // Set the timer interval to 1000ms === 1s
        seconds = Math.floor(time / 1000);
        // Ensure seconds alwats appear in 2 digit format
        if (seconds > 9) {
            timer.innerHTML = `Game Time &ndash; ${minutes}:${seconds++}`;
        } else {
            timer.innerHTML = `Game Time &ndash; ${minutes}:0${seconds++}`;
        }
        // Increment the minutes and set seconds to 0 after 59
        if (seconds > 59) {
            minutes++;
            seconds = 0;
            // Restart timer
            start = new Date().getTime();
        }
        // Set the timer interval to 1000ms === 1s
    }, 100);
}

randomBoard();
buildGameBoard();
appendEvent();
