const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const helmet = require('helmet');

const port = process.env.PORT || 3001;
const app = express();

app.use(helmet());


app.listen(port, (err)=>{
    if(err)
    {
        console.log("Error occurred during connection", err);
    }
    else{
        console.log("Connection established successfully at:", port );
    }
})

