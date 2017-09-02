var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  moves: Number,
  timer: Number,
  name: String,
  key: Number
});

module.exports = mongoose.model("Score", ScoreSchema);