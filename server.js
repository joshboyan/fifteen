// Set up express instance
var express = require('express');
var path = require('path');
var app = express();

// Get a router instance
var router = express.Router();

//Set up port variable
var port = process.env.PORT || 3899;

app.use(express.static(__dirname));

// Test route
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port,
  console.log("Listening on port " + port));
