/*
* This file initializes the indexedDB data stores and 
* uploads any offline info to the main mongoDB
*/
function indexedDB(){
  // Open an indexedDB database
  var dbPromise = idb.open('scores', 1, upgradeDB => {
      // Create object store in the database
      let scores = upgradeDB.createObjectStore('scores', {keypath: autoincrement});
      // Create keys to query database
      scores.createIndex('timer', 'timer');
      scores.createIndex('moves', 'moves');
  }).catch(error => {
      console.error(error);
  });

  var dbPromiseOffline = idb.open('offline', 1, upgradeDB => {
      // Create object store in the database
      let offline = upgradeDB.createObjectStore('offline', {keypath: autoincrement});
  }).catch(error => {
      console.error(error);
  });

  // Add scores form offline play to mongo
  if(addOfflineScores){
      dbPromiseOffline.then(db => {
          // Create a transaction
          let tx = db.transaction('offline');
          // Open up the object store
          let store = tx.objectStore('offline');
          // Get all the objects
          return store.getAll();
      }).then(offline => {
          fetch('/api/scores', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(offline)
          })
              console.log("The following entry has been made to mongo: ", offline);
      }).catch(err => {
          console.error("There was an error updating mongo with offline scores. ", err)
      }); 
  }

  // Get the number of score entries for internal use
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
}