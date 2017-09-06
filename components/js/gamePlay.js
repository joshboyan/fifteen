/* 
* This file contains the functions that deal with the user interacting 
* with the game.
*/

// Move the peices around the board
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
                ga('send', 'event', 'game play', 'click');
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