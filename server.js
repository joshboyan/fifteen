// Set up express instance
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get a router instance
var router = express.Router();

//Set up port variable
var port = process.env.PORT || 3899;

var dbURI = 'mongodb://josh11:josh11@ds115214.mlab.com:15214/heroku_nfl4r94m';
// Connect to database with mongoose driver
var mongoose = require('mongoose');
mongoose.connect(dbURI, {
  useMongoClient: true,
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// Import model
var Score = require('./models/score.js');

// Give UI access to statics assets
app.use(express.static(path.join(__dirname + '/builds/dist/')));

// Serve UI from server
router.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/builds/dist/index.html'));
});

// Register routes
app.use('/api', router);

// All routes that end in /scores
router.route('/scores')

  // Creat a score entry
  .post(function(req, res){
    var score = new Score();
    score.moves = req.body.moves;
    score.timer = req.body.timer;
    score.name = req.body.name;
    score.key = req.body.key;

    // Save the score and check for errors
    score.save(function(err){
      if(err){
        res.send(err);
      } else {
        res.json({message:"Score added!"});
      }
    });
  })

  // Get all the scores
  .get(function(req, res){
    Score.find(function(err, scores){
      if(err){
        res.send(err);
      } else {
        res.json(scores);
      }
    })
  });

app.listen(port,
  console.log("Listening on port " + port));
