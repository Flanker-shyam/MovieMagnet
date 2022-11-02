require('dotenv').config();
const express = require('express');
const connectDB = require("./databaseConnect/mongooseDB");

const app = express();

require("./startup/logger");
require("./startup/routes")(app);
require("./startup/config")();

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URL || "mongodb://localhost:27017/";

//connect to the database

connectDB(URI + "moviesData");

app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occurred during connection", err);
    }
    else {
        console.log("Connection established successfully at:", PORT);
    }
})
module.exports = app