
const mongoose = require("mongoose");

const connectDB = (url)=>{
    mongoose
    .connect(url)
    .then(()=>{
        console.log(`Database connected successfully to ${url}...`);
    })
    .catch((err)=>{
        console.log("Error while connecting to database");
    })
}

module.exports = connectDB;