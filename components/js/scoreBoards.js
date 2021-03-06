/*
* This file fetches all the scores from the database and builds
* the ranking boards. If the user is offline it defaults to the 
* scores stored in indexedDB
*/

function buildScoreBoard(type, board) {
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
	}).catch(err => {
		console.error(err);
	});
  	// Create the board in the DOM
    function populateScoreBoard(rankings){
       // Clean everything of the board
        board = document.getElementById(board);
        while (board.hasChildNodes()) {
            board.removeChild(board.lastChild);
        }
        // Format each database key into an html entry for the score boards
        rankings.forEach((rank, index) => {
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
}