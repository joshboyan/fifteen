(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = { exports: {} };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        /*You can have as many different javascript files as you like. 
        They will all be compiled to ES5, concantenated and linted for the dev build and
        minified with comments removed for the dist build.*/
        var idb = require('idb');
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
        var winCount = 0;
        var seconds = 0;
        var minutes = 0;
        var name;
        var time;
        // Initial entries in indexedDB
        var gameStats = {
            moves: counter,
            timer: Math.floor(time / 1000),
            name: name
        }
        var game1 = {
            moves: 22,
            timer: (400),
            name: 'John'
        }
        var game2 = {
            moves: 30,
            timer: (500),
            name: 'Beth'
        }
        var game3 = {
            moves: 25,
            timer: (600),
            name: 'Joey'
        }
        // Open an indexedDB database
        var dbPromise = idb.open('scores', 1, upgradeDB => {
            // Create object store in the database
            let scores = upgradeDB.createObjectStore('scores');
            // Create keys to query database
            scores.createIndex('timer', 'timer');
            scores.createIndex('moves', 'moves')
            // Add initial entries to indexedDB
            scores.put(game1, 'key2');
            scores.put(game2, 'key3');
            scores.put(game3, 'key4');
        });
        /*
        Not sure if I need any of these but entryCount
         */
        var tx;
        var scores;
        var entryCount;
        // Access the database
        dbPromise.then(db => {
            // Create a new transaction
            tx = db.transaction('scores', 'readwrite');
            // Select the object store to work with
            scores = tx.objectStore('scores', 'readwrite');
            //Get the number of entries n the objectStore
            entryCount = scores.count();
            //console.log(entryCount);
            return entryCount;
        })/*.then(entryCount => {
            // console.log(`There are ${entryCount} entries in this objectStore`);
            var i = 0;
            var scoreCardEntry;
            //console.log(entryCount);
            while (i < entryCount) {
                i++;
                var record = `key${i}`;
                //console.log(record);
                scoreCardEntry = scores.get(record);
                //console.log(scoreCardEntry.request.readyState);
                scoreCardEntry.then(function(scoreCardEntry) {
                    //console.log(scoreCardEntry);
                    //console.log(`${scoreCardEntry.name} won in ${scoreCardEntry.moves} moves!`);
                })
            }
            return entryCount;
        })*/.catch(error => {
            console.error(error);
        });

        function randomBoard() {
            //Ensure game board array is cleared
            gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15];//Change this back to 1-15
            //Game piece values for new game
            /*gameField = [];
            let startArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            while (startArr.length > 0) {
                //Set picked to a random number from 0 - 14
                let picked = startArr[Math.ceil(Math.random() * startArr.length) - 1];
                //Push the game piece that corresponds with the picked number
                //from the startArr to the gamefield array until all have been placed
                gameField.push(startArr.splice(startArr.indexOf(picked), 1));
            }
            //Set the final space to be blank with null spaceholder
            gameField.push(null);*/
            //Run check to see if the game cannot be won
            if (!boardCheck()) {
                //Call the function recursively if the game cannot be won
                randomBoard();
            }
        }

        function winCheck() {
            // Get the initial count from the DB
            if (winCount == 0) {
                entryCount = entryCount.request.result;
            }
            //variable to store the number of elements that match between
            //compareArr and gameField
            let matchCounter = 0;
            // Check that each element in the gameField array matches
            // the compareArr winning condition            
            compareArr.forEach((element, index) => {
                if (parseInt(element) === parseInt(gameField[index])) {
                    matchCounter++;
                }
            });
            if (matchCounter === 15) {
                // Display the screen that says you win and enter name form
                document.getElementById('youWin').classList.add('open');
                document.getElementById('name').autofocus = true;
                // Script to autofocus cursor in browsers without native support;
                if (!("autofocus" in document.createElement("input"))) {
                    document.getElementById("name").focus();
                }
            }
            // Increment the counts
            winCount++;
        }
        function winSequence() {
            // Set the details of the game
            gameStats = {
                moves: counter,
                timer: Math.floor(time / 1000),
                name: name
            }
            console.log('You Win!!');
            removeTimer();
            // Initialize a new game
            counter = 0;
            document.getElementById('counter').innerHTML='Moves:0';

            // Add the info from this game to the DB
            dbPromise.then(db => {
                tx = db.transaction('scores', 'readwrite');
                scores = tx.objectStore('scores', 'readwrite');
                scores.add(gameStats, `key${entryCount}`);
            }).catch(err => console.log(err))
            // Increment the counter for the idb key
            entryCount++;
            // Set timeScoreBoard "x" to open movesScoreBoard
            document.getElementById('exitTimes').style.display='none';
            document.getElementById('exitTimesWin').style.display='block';
            // Set movesScoreBoard "x" to restart the game
            document.getElementById('exitMoves').style.display='none';
            document.getElementById('exitMovesWin').style.display='block';
            openTimeScoreBoard();

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
                document.getElementById('counter').innerHTML = ` Moves:${counter++}`;
                return true;
            }
        }
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
                    var targetId = parseInt(e.target.id);
                    // If the game piece the user clicked is a legal move
                    if (checkEmpty(targetId)) {
                        // Set the blank piece to the targetId the user clicked
                        gameField[gameField.indexOf(null)] = gameField[targetId];
                        // Remove the game piece value from targetId
                        gameField[targetId] = null;
                        console.log(entryCount);
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
        function removeTimer() {
            // Remove old timer and create a p element to hold the new one
            // created in gameTimer
            document.getElementById("timer").remove(timer);
            let newTimer = document.createElement('p');
            newTimer.id = 'timer';
            document.getElementById('gameStats').appendChild(newTimer);
        }
        function gameTimer() {
            let timer = document.getElementById("timer");

            seconds = 0;
            minutes = 0;
            let start = new Date().getTime();

            window.setInterval(function() {
                //Find how much time has elasped between ow and starting time
                time = new Date().getTime() - start;
                // Set the timer interval to 1000ms === 1s
                seconds = Math.floor(time / 1000);
                // Ensure seconds always appear in 2 digit format

                if (seconds > 9) {
                    timer.innerHTML = `${minutes}:${seconds}`;
                } else {
                    timer.innerHTML = `${minutes}:0${seconds}`;
                }
                // Increment the minutes and set seconds to 0 after 59
                if (seconds > 59) {
                    minutes++;
                    seconds = 0;
                    // Restart timer
                    start = new Date().getTime();
                }
                return time;
                // Set the timer interval to 1000ms === 1s
            }, 100);
        }
        function buildScoreBoard(type, board) {
            dbPromise.then(function (db) {
                var tx = db.transaction('scores');
                var store = tx.objectStore('scores');
                var myIndex = store.index(type)
                var rankings =  myIndex.getAll();
                return rankings;
            }).then(function (rankings) {
                console.log(rankings, board);
                board = document.getElementById(board);
                while (board.hasChildNodes()) {
                    board.removeChild(board.lastChild);
                }
                rankings.forEach(function(rank, index) {
                    console.log(rank);
                    var node = document.createElement('div');
                    node.innerHTML =`<span>${index+1})</span><span>${rank.name}</span><span>${rank[type]}</span>`;
                    board.appendChild(node);
                });

            });
        }
        function openTimeScoreBoard() {
            buildScoreBoard('timer', 'timeEntries');
            document.getElementById('timeScoreBoard').classList.add('open');
        }
        function openMovesScoreBoard() {
            buildScoreBoard('moves', 'moveEntries');
            document.getElementById('movesScoreBoard').classList.add('open');
        }
        // Restart the game
        function refresh() {
            randomBoard();
            buildGameBoard();
            appendEvent();
            removeTimer()
            gameTimer();
            // Set the scoreboard "x's" to just close overlay
            document.getElementById('exitTimesWin').style.display='none';
            document.getElementById('exitTimes').style.display='block';
            document.getElementById('exitMovesWin').style.display='none';
            document.getElementById('exitMoves').style.display='block';
        }
        refresh();

        //UI click events javascript
        document.getElementById('instructionsTrigger').addEventListener('click', function(e) {
            document.getElementById('instructions').classList.remove('close-instructions');
        });
        document.getElementById('closeInstructions').addEventListener('click', function(e) {
            document.getElementById('instructions').classList.add('close-instructions');
        });
        document.getElementById('refresh').addEventListener('click', function(e) {
            refresh();
        });
        document.getElementById('timeScores').addEventListener('click', function(e) {
            openTimeScoreBoard();

        });
        document.getElementById('exitTimes').addEventListener('click', function(e) {
            document.getElementById('timeScoreBoard').classList.remove('open');
        });
        document.getElementById('exitTimesWin').addEventListener('click', function(e) {
            document.getElementById('timeScoreBoard').classList.remove('open');
            openMovesScoreBoard();
        })
        document.getElementById('moveScores').addEventListener('click', function(e) {
            openMovesScoreBoard();

        });
        document.getElementById('exitMoves').addEventListener('click', function(e) {
            document.getElementById('movesScoreBoard').classList.remove('open');
        });
        document.getElementById('exitMovesWin').addEventListener('click', function(e) {
            document.getElementById('movesScoreBoard').classList.remove('open');
            refresh();
        });
        document.getElementById('info').addEventListener('click', function(e) {
            document.getElementById('infoBoard').classList.add('open');
        });
        document.getElementById('exitInfo').addEventListener('click', function(e) {
            document.getElementById('infoBoard').classList.remove('open');
        });
        document.getElementById('exitYouWin').addEventListener('click', function(e) {
            document.getElementById('youWin').classList.remove('open');
            document.getElementById('yourName').classList.add('open');
        });
        document.getElementById('exitYourName').addEventListener('click', function(e) {
            document.getElementById('yourName').classList.remove('open');
            name = document.getElementsByTagName('input')[0].value;
            winSequence();
        });


    }, { "idb": 2 }],
    2: [function(require, module, exports) {
        'use strict';

        (function() {
            function toArray(arr) {
                return Array.prototype.slice.call(arr);
            }

            function promisifyRequest(request) {
                return new Promise(function(resolve, reject) {
                    request.onsuccess = function() {
                        resolve(request.result);
                    };

                    request.onerror = function() {
                        reject(request.error);
                    };
                });
            }

            function promisifyRequestCall(obj, method, args) {
                var request;
                var p = new Promise(function(resolve, reject) {
                    request = obj[method].apply(obj, args);
                    promisifyRequest(request).then(resolve, reject);
                });

                p.request = request;
                return p;
            }

            function promisifyCursorRequestCall(obj, method, args) {
                var p = promisifyRequestCall(obj, method, args);
                return p.then(function(value) {
                    if (!value) return;
                    return new Cursor(value, p.request);
                });
            }

            function proxyProperties(ProxyClass, targetProp, properties) {
                properties.forEach(function(prop) {
                    Object.defineProperty(ProxyClass.prototype, prop, {
                        get: function() {
                            return this[targetProp][prop];
                        },
                        set: function(val) {
                            this[targetProp][prop] = val;
                        }
                    });
                });
            }

            function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
                properties.forEach(function(prop) {
                    if (!(prop in Constructor.prototype)) return;
                    ProxyClass.prototype[prop] = function() {
                        return promisifyRequestCall(this[targetProp], prop, arguments);
                    };
                });
            }

            function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
                properties.forEach(function(prop) {
                    if (!(prop in Constructor.prototype)) return;
                    ProxyClass.prototype[prop] = function() {
                        return this[targetProp][prop].apply(this[targetProp], arguments);
                    };
                });
            }

            function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
                properties.forEach(function(prop) {
                    if (!(prop in Constructor.prototype)) return;
                    ProxyClass.prototype[prop] = function() {
                        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
                    };
                });
            }

            function Index(index) {
                this._index = index;
            }

            proxyProperties(Index, '_index', [
                'name',
                'keyPath',
                'multiEntry',
                'unique'
            ]);

            proxyRequestMethods(Index, '_index', IDBIndex, [
                'get',
                'getKey',
                'getAll',
                'getAllKeys',
                'count'
            ]);

            proxyCursorRequestMethods(Index, '_index', IDBIndex, [
                'openCursor',
                'openKeyCursor'
            ]);

            function Cursor(cursor, request) {
                this._cursor = cursor;
                this._request = request;
            }

            proxyProperties(Cursor, '_cursor', [
                'direction',
                'key',
                'primaryKey',
                'value'
            ]);

            proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
                'update',
                'delete'
            ]);

            // proxy 'next' methods
            ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
                if (!(methodName in IDBCursor.prototype)) return;
                Cursor.prototype[methodName] = function() {
                    var cursor = this;
                    var args = arguments;
                    return Promise.resolve().then(function() {
                        cursor._cursor[methodName].apply(cursor._cursor, args);
                        return promisifyRequest(cursor._request).then(function(value) {
                            if (!value) return;
                            return new Cursor(value, cursor._request);
                        });
                    });
                };
            });

            function ObjectStore(store) {
                this._store = store;
            }

            ObjectStore.prototype.createIndex = function() {
                return new Index(this._store.createIndex.apply(this._store, arguments));
            };

            ObjectStore.prototype.index = function() {
                return new Index(this._store.index.apply(this._store, arguments));
            };

            proxyProperties(ObjectStore, '_store', [
                'name',
                'keyPath',
                'indexNames',
                'autoIncrement'
            ]);

            proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
                'put',
                'add',
                'delete',
                'clear',
                'get',
                'getAll',
                'getKey',
                'getAllKeys',
                'count'
            ]);

            proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
                'openCursor',
                'openKeyCursor'
            ]);

            proxyMethods(ObjectStore, '_store', IDBObjectStore, [
                'deleteIndex'
            ]);

            function Transaction(idbTransaction) {
                this._tx = idbTransaction;
                this.complete = new Promise(function(resolve, reject) {
                    idbTransaction.oncomplete = function() {
                        resolve();
                    };
                    idbTransaction.onerror = function() {
                        reject(idbTransaction.error);
                    };
                    idbTransaction.onabort = function() {
                        reject(idbTransaction.error);
                    };
                });
            }

            Transaction.prototype.objectStore = function() {
                return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
            };

            proxyProperties(Transaction, '_tx', [
                'objectStoreNames',
                'mode'
            ]);

            proxyMethods(Transaction, '_tx', IDBTransaction, [
                'abort'
            ]);

            function UpgradeDB(db, oldVersion, transaction) {
                this._db = db;
                this.oldVersion = oldVersion;
                this.transaction = new Transaction(transaction);
            }

            UpgradeDB.prototype.createObjectStore = function() {
                return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
            };

            proxyProperties(UpgradeDB, '_db', [
                'name',
                'version',
                'objectStoreNames'
            ]);

            proxyMethods(UpgradeDB, '_db', IDBDatabase, [
                'deleteObjectStore',
                'close'
            ]);

            function DB(db) {
                this._db = db;
            }

            DB.prototype.transaction = function() {
                return new Transaction(this._db.transaction.apply(this._db, arguments));
            };

            proxyProperties(DB, '_db', [
                'name',
                'version',
                'objectStoreNames'
            ]);

            proxyMethods(DB, '_db', IDBDatabase, [
                'close'
            ]);

            // Add cursor iterators
            // TODO: remove this once browsers do the right thing with promises
            ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
                [ObjectStore, Index].forEach(function(Constructor) {
                    Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
                        var args = toArray(arguments);
                        var callback = args[args.length - 1];
                        var nativeObject = this._store || this._index;
                        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
                        request.onsuccess = function() {
                            callback(request.result);
                        };
                    };
                });
            });

            // polyfill getAll
            [Index, ObjectStore].forEach(function(Constructor) {
                if (Constructor.prototype.getAll) return;
                Constructor.prototype.getAll = function(query, count) {
                    var instance = this;
                    var items = [];

                    return new Promise(function(resolve) {
                        instance.iterateCursor(query, function(cursor) {
                            if (!cursor) {
                                resolve(items);
                                return;
                            }
                            items.push(cursor.value);

                            if (count !== undefined && items.length == count) {
                                resolve(items);
                                return;
                            }
                            cursor.continue();
                        });
                    });
                };
            });

            var exp = {
                open: function(name, version, upgradeCallback) {
                    var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
                    var request = p.request;

                    request.onupgradeneeded = function(event) {
                        if (upgradeCallback) {
                            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
                        }
                    };

                    return p.then(function(db) {
                        return new DB(db);
                    });
                },
                delete: function(name) {
                    return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
                }
            };

            if (typeof module !== 'undefined') {
                module.exports = exp;
            } else {
                self.idb = exp;
            }
        }());

    }, {}]
}, {}, [1]);
