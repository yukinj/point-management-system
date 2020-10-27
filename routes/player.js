const express = require("express");
const Player  = require("../models/Player");
const router = express.Router();

router.post("/",async(req,res)=>{
 let {name1,serve1,name2,serve2} =req.body;
 console.log(req.body);
 try{
     if(!name2){
      name2 = 'player2'
     }

     const player2 = await new Player({
      name :name2,
      server : serve2,
    });
   
     const player1 = await new Player({
      name : name1,
      server : serve1,
    });

   //await player1.save();
   await player1.save();
   await player2.save();
   res.send('Created user successfully');
}catch(err){
  console.error(err.message);
  return res.send({msg:'server error'});
 }

});

module.exports = router;