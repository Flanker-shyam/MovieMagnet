
const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose
        .connect(url)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log(err);
            setTimeout(connectDB(url), 5000);
        })
}

module.exports = connectDB;