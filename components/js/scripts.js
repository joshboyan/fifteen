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
        'esversion: 7';
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
        var dbPromise = idb.open('scores', 1, upgradeDB => {
            let timeScores = upgradeDB.createObjectStore('timeScores');
            timeScores.put(gameStats, 'key1');
            timeScores.put(game1, 'key2');
            timeScores.put(game2, 'key3');
            timeScores.put(game3, 'key4');
        });
        var tx;
        var timeScores;
        var entryCount;
        dbPromise.then(db => {
            tx = db.transaction('timeScores', 'readwrite');
            timeScores = tx.objectStore('timeScores', 'readwrite');
            entryCount = timeScores.count();
            //console.log(entryCount);
            return entryCount;
        }).then(entryCount => {
            // console.log(`There are ${entryCount} entries in this oject store`);
            var i = 0;
            var scoreCardEntry;
            console.log(entryCount);
            while (i < entryCount) {
                i++;
                var record = `key${i}`;
                //console.log(record);
                scoreCardEntry = timeScores.get(record);
                //console.log(scoreCardEntry.request.readyState);
                scoreCardEntry.then(function(scoreCardEntry) {
                    //console.log(scoreCardEntry);
                    //console.log(`${scoreCardEntry.name} won in ${scoreCardEntry.moves} moves!`);
                })
            }
            return entryCount;
        }).catch(error => {
            console.error(error);
        });

        function randomBoard() {
            //Ensure game board array is cleared
            //gameField = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15];//Change this back to 1-15
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

        function winCheck() {
            // Get the initial count from the DB
            if (winCount == 0) {
                entryCount = entryCount.request.result + 1;
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
                //Display the screen that says you win and enter name form

                // Set the details of the game
                gameStats = {
                        moves: counter,
                        timer: Math.floor(time / 1000),
                        name: name
                    }
                    // Reset the game
                console.log('You Win!!');
                randomBoard();
                buildGameBoard();
                counter = 0;

                // Add the info from this game to the DB
                dbPromise.then(db => {
                    tx = db.transaction('timeScores', 'readwrite');
                    timeScores = tx.objectStore('timeScores', 'readwrite');
                    timeScores.add(gameStats, `key${entryCount}`);
                }).catch(err => console.log(err))
            }

            // Increment the counts
            winCount++
            return entryCount++;
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
            gameTimer();
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
                document.getElementById('counter').innerHTML = `Moves: ${counter++}`;

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

        function gameTimer() {
            let timer = document.getElementById("timer");
            timer.innerHTML = 'Game Time &ndash; 0:00';
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
                    timer.innerHTML = `Game Time &ndash; ${minutes}:${seconds}`;
                } else {
                    timer.innerHTML = `Game Time &ndash; ${minutes}:0${seconds}`;
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

        function refresh() {
            randomBoard();
            buildGameBoard();
            appendEvent();
        }
        refresh();

        //UI javascript
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
            document.getElementById('timeScoreBoard').classList.add('open');
        });
        document.getElementById('exitTimes').addEventListener('click', function(e) {
            document.getElementById('timeScoreBoard').classList.remove('open');
        });
        document.getElementById('moveScores').addEventListener('click', function(e) {
            document.getElementById('movesScoreBoard').classList.add('open');
        });
        document.getElementById('exitMoves').addEventListener('click', function(e) {
            document.getElementById('movesScoreBoard').classList.remove('open');
        });
        document.getElementById('info').addEventListener('click', function(e) {
            document.getElementById('infoBoard').classList.add('open');
        });
        document.getElementById('exitInfo').addEventListener('click', function(e) {
            document.getElementById('infoBoard').classList.remove('open');
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
