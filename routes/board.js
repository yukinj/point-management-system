const express = require("express");
const Player  = require("../models/Player");
const LB  = require("../models/LB");
const router = express.Router();
const mongoose = require("mongoose");
const addPoint =  require('../controller/addPoints');

router.get("/",
async(req,res)=>{
   try{
     let lb = await LB.findOne();
 if(!lb){
      // get all players 
      //console.log(players);
      //create lb 
      lb = new LB();
      players = await Player.find();
      players.map(player=> lb.ranks.push({player:player._id,wins:player.wins,total_points:player.total_points}));
      await lb.save();
      res.send('Leaderboard just created, please refresh ');
     }else{
      lb = await LB.findOne()
                      .populate({
                       path:"ranks",
                       populate: {
                          path:"player",
                      }});
      function compare( a, b ) {  
       return b.wins - a.wins || a.total_points - b.total_points
      }
      let sorted_rank = lb.ranks.sort(compare);
      return res.json(sorted_rank);
     }
   }catch(err){
    console.error(err.message);
    res.send('server for LB failed ');
   }
});

module.exports = router;