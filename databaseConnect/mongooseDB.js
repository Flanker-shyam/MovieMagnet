
const mongoose = require("mongoose");

const connectDB = (url)=>{
    mongoose
    .connect(url)
    .then(()=>{
        console.log(`Database connected successfully...`);
    })
    .catch((err)=>{
        console.log(`Error while connecting to database: ${err}`);
    })
}

module.exports = connectDB;