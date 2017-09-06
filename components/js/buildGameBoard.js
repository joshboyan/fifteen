/*
* This file contains all the function neccesary to build a game board
* and ensure it is mathematically possible to win.
*/

function randomBoard() {
    //Ensure game board array is cleared
    
    /*/Set game board up 1 move from winning to check win sequence for testing
    gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15]; //Change this back to 1-15
    */

    //Game piece values for new game
    gameField = [];
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

// Appends acceptable board to the DOM
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