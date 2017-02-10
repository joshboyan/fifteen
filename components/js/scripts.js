/*You can have as many different javascript files as you like. 
They will all be compiled to ES5, concantenated and linted for the dev build and
minified with comments removed for the dist build.*/
var gameField = []
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
]

function randomBoard() {
    gameField = []
    var startArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    while (startArr.length > 0) {
        var picked = startArr[Math.ceil(Math.random() * startArr.length) - 1]
        gameField.push(startArr.splice(startArr.indexOf(picked), 1))
    }
    gameField.push(null)
    if (!boardCheck()) {
        randomBoard()
    }
}

function winCheck() {
    for (var i = 0; i < compareArr.length; i++) {
        if (compareArr[i] === gameField[i]) {
            console.log(gameField[i])
        }
        //console.log(gameField[i])
        //console.log(compareArr[i])
    }
}

function boardCheck() {
    var permutations = 0
    for (var startElem = 0; startElem < gameField.length - 1; startElem++) {
        for (var currentElem = startElem + 1; currentElem < gameField.length - 1; currentElem++) {
            if (gameField[startElem] > gameField[currentElem]) {
                permutations++
            }
        }
    }
    if (permutations % 2 === 0) {
        return true
    } else {
        return false
    }
}

function buildGameBoard() {
    $("#container").empty()
    gameField.forEach(function(field, index) {
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
    // top or bottom(respectively) of the space number clicked
    if (blankSpace === targetId - 1 ||
        blankSpace === targetId + 1 ||
        blankSpace === targetId - 4 ||
        blankSpace === targetId + 4) {
        return true
    }
}

function appendEvent() {
    //Get all of the game pieces
    var tiles = document.getElementsByClassName('box');
    //console.log(typeof tiles);
    //Loop through all of the game pieces
    for (let i = 0; i < tiles.length; i++) {
        //console.log(tiles[i]);
        //Add click event to all game pieces
        tiles[i].addEventListener('click', function(e) {
          console.log(e.target.id);
          
            var targetId = parseInt(e.target.id)
            //console.log(targetId);
            winCheck()
            if (checkEmpty(targetId)) {
                gameField[gameField.indexOf(null)] = gameField[targetId]
                gameField[targetId] = null
                buildGameBoard()
                appendEvent()
            }
        })
    }
}



randomBoard()
buildGameBoard()
appendEvent()
