const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const player = require('./routes/player');
const points = require('./routes/points');
const board = require('./routes/board');

// Body-parser  middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then()
  .catch((err) => console.log(err));
   console.log("MongoDB connected");

   app.use("/player", player);
   app.use("/points", points);
   app.use("/board", board);


   const port = process.env.PORT || 3002;
   console.log(`port num is ${port}`);
   app.listen(port, () => console.log(`Server running on port ${port}`));   

