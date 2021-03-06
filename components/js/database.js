/*
* This file initializes the indexedDB data stores and 
* uploads any offline info to the main mongoDB
*/

function indexedDB(){
  // Open an indexedDB database
  var dbPromise = idb.open('scores', 1, upgradeDB => {
      // Create object store in the database
      let scores = upgradeDB.createObjectStore('scores');
      // Create keys to query database
      scores.createIndex('timer', 'timer');
      scores.createIndex('moves', 'moves');
  }).catch(err => {
      console.error(err);
  });

  var dbPromiseOffline = idb.open('offline', 1, upgradeDB => {
      // Create object store in the database
      let offline = upgradeDB.createObjectStore('offline');
  }).then(db => {
          // Create a transaction
          let tx = db.transaction('offline');
          // Open up the object store
          let store = tx.objectStore('offline');
          // Get all the objects
          return store.getAll();
      }).then(offline => {
          offline.forEach(score => {
            fetch('/api/scores', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(offline)
          });
              console.log("The following entry has been made to mongo: ", offline);
          });
      }).then(() => {
          // Empty the offline object store
          idb.open('offline', 1).then(db => {
                let tx = db.transaction('offline', 'readwrite');
                let offline = tx.objectStore('offline', 'readwrite');
                offline.clear();
          });
      }).catch(err => {
          console.error("There was an error updating mongo with offline scores. ", err)
      }); 

  // (Don't think I need this anymore)Get the number of score entries for internal use
  dbPromise.then(db => {
      // Create a new transaction
      let tx = db.transaction('scores', 'readwrite');
      // Select the object store to work with
      let scores = tx.objectStore('scores', 'readwrite');
      //Get the number of entries n the objectStore
      entryCount = scores.count();
      return entryCount;
  }).catch(err => {
      console.error(err);
  });
}

// Get all the data from mongo and put in indexedDB access under low connectivity
function mongo(){
    // Get the scores form mongo
    fetch('/api/scores').then(rankings => {
        // Parse the repsonse into JSON
        return rankings.json();
    }).then(data => {
        console.log(data);
        // Clear mongo and add all the data from mongo
        idb.open('scores', 1).then(db => {
            let tx = db.transaction('scores', 'readwrite');
            scores = tx.objectStore('scores', 'readwrite');
            let indexedDBBackup = scores.clear();
            data.forEach(score => {
                scores.add(score, scoresKey);
                scoresKey++;
            });
            return indexedDBBackup;
        // If there is an error fetching mongo scores, repopulate indexedDB with old data    
        }).catch(indexedDBBackup => {
            indexedDBBackup.forEach(elem => {
                scores.add(elem, scoresKey);
                scoresKey++;
            });
            console.log('Repopulating indexedDB with scores');
        });        
    }).catch(err => {
        console.error("There was a problem communicating with the database", err);
    });
}