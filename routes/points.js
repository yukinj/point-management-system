const express = require("express");
const Player  = require("../models/Player");
// const LB  = require("../models/LB");
const router = express.Router();
const mongoose = require("mongoose");
const addPoint =  require('../controller/addPoints');

router.put("/",addPoint,async(req,res,next)=>{
   let {name1,name2} = req.body;
   const player1= await Player.findOne({name:name1});
   const player2= await Player.findOne({name:name2});
   try{
      // console.log(player1.points, player2.points);
      // caculate wins
      if(player1.points> 10 && player2.points< 10){
         // add wins 
         player1.wins  += 1 ;
         // add accu points ,reset points, reset server
         player1.total_points += player1.points;
         player2.total_points += player2.points;
         player1.points = 0;
         player2.points = 0;
         player1.server = true;
         player2.server = false;
         await player1.save();
         await player2.save();
         res.send('play1 wins, game is over');
      }else if(player2.points> 10 && player1.points< 10){
         // add wins 
         player2.wins  += 1 ;
         // add accu points ,reset points, reset server
         player1.total_points += player1.points;
         player2.total_points += player2.points;
         player1.points = 0;
         player2.points = 0;
         player1.server = true;
         player2.server = false;
         await player1.save();
         await player2.save();
         res.send('play2 wins, game is over');
      }else if(player1.points >= 10 && player2.points >=  10){
         if(player1.points-player2.points>=2){
                     // add wins 
                  player1.wins  += 1 ;
                  // add accu points ,reset points, reset server
                  player1.total_points += player1.points;
                  player2.total_points += player2.points;
                  player1.points = 0;
                  player2.points = 0;
                  player1.server = true;
                  player2.server = false;
                  await player1.save();
                  await player2.save();
                  res.send('play1 wins, game is over');
         }else if(player2.points-player1.points>=2){
                  // add wins 
                  player2.wins  += 1 ;
                  // add accu points ,reset points, reset server
                  player1.total_points += player1.points;
                  player2.total_points += player2.points;
                  player1.points = 0;
                  player2.points = 0;
                  player1.server = true;
                  player2.server = false;
                  await player1.save();
                  await player2.save();
                  res.send('play2 wins, game is over');
               }  
      }
     
   }catch(err){
       console.error(err.message);
       return res.send({msg:'server error, failed to caculate wins'});
      }
      next();
   }
 );
 module.exports = router;