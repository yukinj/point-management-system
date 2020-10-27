const express = require("express");
const Player  = require("../models/Player");
let  cnt = 0;

module.exports = async(req,res,next)=>{
  //console.log(req.body);
  let {name1,name2,score1,score2} = req.body;
  const player1= await Player.findOne({name:name1});
  const player2= await Player.findOne({name:name2});
  try{
     // if(player1.server == player2.server){
     //    player2.server = !player2.server;
     //    await player2.save()
     // }
     if(score2 && score1) {
        res.send('there is only one player wins');
     }
     if(!score2 && !score1) {
      res.send('there has to be one player wins');}
     if(score1 && !score2){
        cnt += 1 ;
        //console.log(player1.points);
        console.log('p1 before',player1.points,'p1 serve before',player1.server);
        console.log('p2 before',player2.points,'p2 serve before',player2.server);
        player1.points = player1.points + 1 ;
       // console.log(player1.points);
       if(cnt!== 1  && cnt%2=== 1){
           player1.server = !player1.server;
           player2.server = !player2.server;
       }
        await player1.save();
        await player2.save();
        console.log('p1 after',player1.points,'p1 serve after',player1.server);
        console.log('p2 after',player2.points,'p2 serve after',player2.server);
        console.log('update score succeeded');

  }else if(score2 && !score1){
        cnt += 1 ;
        console.log('p1 before',player1.points,'p1 serve before',player1.server);
        console.log('p2 before',player2.points,'p2 serve before',player2.server);
        player2.points = player2.points + 1;
        if(cnt!== 1  && cnt%2=== 1){
           player1.server = !player1.server;
           player2.server = !player2.server;
     }
        await player1.save();
        await player2.save();
        console.log('p1 after',player1.points,'p1 serve after',player1.server);
        console.log('p2 after',player2.points,'p2 serve after',player2.server);
  
      console.log('update score succeeded');
     }
     next();
  }catch(err){
     console.error(err.message);
     return res.send({msg:'server error, failed to add point'});
  } 
  
};