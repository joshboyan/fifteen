/*You can have as many different javascript files as you like. 
They will all be compiled to ES5, concantenated and linted for the dev build and
minified with comments removed for the dist build.*/
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
    [15], null
];

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
        //randomBoard();
    }
}

function winCheck() {
    //Check that each element in the gameField array matches
    //the compareArr winning condition
    for (let i in compareArr) {
        if (compareArr[i] === gameField[i]) {
            console.log(gameField[i]);
        }
        //console.log(gameField[i])
        //console.log(compareArr[i])
    }
}

function boardCheck() {
    let permutations = gameField.reduce(function(reducePrev, reduceCurr, reduceIndex) {
        starting.map(function(mapCurr, mapIndex) {
            if (mapIndex < reduceIndex) mapCurr = 15;
            //console.log(reducePrev, parseInt(reduceCurr), parseInt(mapCurr));
            if (parseInt(reduceCurr) > parseInt(mapCurr)) reducePrev++;
        });
        return reducePrev;
    }, 0);
    permutations % 2 === 0 ? true : false;
}

function buildGameBoard() {
    $("#container").empty();
    gameField.forEach((field, index) => {
        if (field) {
            $("#container").append(`<div class="box" id="${index}">${field}</div>`)
        } else {
            $("#container").append(`<div class="box" id="${field}">&nbsp;</div>`)
        }
    })
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
        return true;
    }
}

function appendEvent() {
    //Get all of the game pieces
    let tiles = document.getElementsByClassName('box');
    //Loop through all of the game pieces
    for (let i = 0; i < tiles.length; i++) {
        //Add click event to all game pieces
        tiles[i].addEventListener('click', function(e) {
            //Set targetIdto the game piece the user clicked 
            var targetId = parseInt(e.target.id);
            //If the game piece the user clicked is a legal move
            if (checkEmpty(targetId)) {
                //Set the blank piece to the targetId the user clicked
                gameField[gameField.indexOf(null)] = gameField[targetId];
                //Remove the game piece value from targetId
                gameField[targetId] = null;
                //Render game board with new positions
                buildGameBoard();
                //Winning condition check if pieces are in numerical order
                winCheck();
                //Call function recursivley until winning condition is met
                appendEvent();
            }

        });
    }
}

randomBoard();
buildGameBoard();
appendEvent();
