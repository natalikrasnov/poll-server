const express = require('express');
const cors = require("cors");

const usersRouter = require('./routers/users');
const scoresRouter = require("./routers/scores");

const corsOptions ={
   origin:'*', 
   //credentials:true,            //access-control-allow-credentials:true
   //optionSuccessStatus:200,
}

const app = express();
app.use(cors(corsOptions)) 

app.use(express.json());

app.use(usersRouter);
app.use(scoresRouter);

module.exports = app;