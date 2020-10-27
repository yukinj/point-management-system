const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const LBSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    default:'leaderboard'
  },
  ranks:[{
          player:{
                type: Schema.Types.ObjectId,
                ref: "player",
          },
            wins:{
                  type: Number,
            },
            total_points:{
                  type:Number,
            }

  }]
 


})

module.exports = LB = mongoose.model('lb',LBSchema);