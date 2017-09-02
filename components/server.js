// Set up express instance
var express = require('express');
var app = express();

// Get a router instance
var router = express.Router();

//Set up port variable
var port = process.env.PORT || 5000;

// Test route
app.get('/', function(req,res){
  res.send('API is kicking!');
});

app.listen(port,
  console.log("Listening on port " + port));
