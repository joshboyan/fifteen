/*
* This file fetches all the scores from the database and builds
* the ranking boards. If the user is offline it defaults to the 
* scores stored in indexedDB
*/

function buildScoreBoard(type, board) {
  // First try mongoDB
	try{
		fetch('/api/scores').then(rankings => {
			// Parse the repsonse into JSON
			return rankings.json();
		}).then(rankings => {
			// Create the board in the DOM
			populateScoreBoard(rankings);
		}).catch(error => {
			console.error(error);
		});
	} catch(err) {
		// Open up the database
		dbPromise.then(db => {
			// Create a transaction
			let tx = db.transaction('scores');
			// open up the object store
			let store = tx.objectStore('scores');
			// Specify the index to use
			let myIndex = store.index(type);
			// Get all the entries ordered by the index

			return myIndex.getAll();
		}).then(rankings => {
			// Create the board in the DOM
			populateScoreBoard(rankings);
		}).catch(error => {
			console.error(error);
		});
		// Connection error
		console.error(err);
	} // End try/catch

  	// Create the board in the DOM
    function populateScoreBoard(rankings){
       // Clean everything of the board
        board = document.getElementById(board);
        while (board.hasChildNodes()) {
            board.removeChild(board.lastChild);
        }
        // Format each database key into an html entry for the score boards
        rankings.forEach(function(rank, index) {
            let node = document.createElement('div');
            //console.log(rank.key);
            //console.log(entryCount);
            if (entryCount > 3 && rank.key == (entryCount - 1)) {
                node.classList.add('latest');
            }
            node.innerHTML = `<span>${index+1})</span><span>${rank.name}</span><span>${rank[type]}</span>`;
            board.appendChild(node);
        });
    }
} // End buildScoreBoard

function openTimeScoreBoard() {
    buildScoreBoard('timer', 'timeEntries');
    document.getElementById('timeScoreBoard').classList.add('open');
}

function openMovesScoreBoard() {
    buildScoreBoard('moves', 'moveEntries');
    document.getElementById('movesScoreBoard').classList.add('open');
}