/*
* This file fetches all the scores from the database and builds
* the ranking boards. If the user is offline it defaults to the 
* scores stored in indexedDB
*/

function buildScoreBoard(type, board) {
  // First try mongoDB
		fetch('/api/scores').then(rankings => {
			// Parse the repsonse into JSON
			return rankings.json();
		}).then(rankings => {	
			console.log(rankings);	
			//Sort in ascending order by the type of board being built
			rankings.sort(function(a, b){
				return a[type] -b[type];
			});
			// Create the board in the DOM
			populateScoreBoard(rankings);
		}).catch(error => {
			console.error(error, "Scoreboards are being populated from browser");
			// Open indexedDB
			idb.open('scores', 1).then(db => {
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
		});

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