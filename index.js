const express = require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const connectDB = require("./databaseConnect/mongooseDB");
const moviesRoute = require("./routes/moviesRoute");
const customerRoute = require("./routes/customerRoute");

const port = process.env.PORT || 3001;
const app = express();

app.use("/movies", moviesRoute);
app.use("/customer", customerRoute);
app.use(helmet());


connectDB("mongodb://localhost:27017/moviesData");

app.listen(port, (err)=>{
    if(err)
    {
        console.log("Error occurred during connection", err);
    }
    else{
        console.log("Connection established successfully at:", port );
    }
})
