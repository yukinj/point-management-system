const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const PlayerSchema = new Schema({
 name:{
    type:String,
    required:true,
    default:"player1",
    unique:true
 },
 server:{
   type: Boolean,
   required: true,
   default:false
 },
 points:{
   type:Number,
   required: true,
   default:0
 },
 score:{
  type: Boolean,
  required: true,
  default:false
 },
 total_points:{
  type:Number,
  default:0
},
win:{
 type: Boolean,
 required: true,
 default:false
},
wins:{
 type: Number,
 default:0
},

})

module.exports = Player = mongoose.model('player',PlayerSchema);