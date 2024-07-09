require('dotenv').config();
const express = require('express');
const connectDB = require("./databaseConnect/mongooseDB");
const config = require("config");

const app = express();

const logger = require("./startup/logger")(app);
require("./startup/routes")(app);
// require("./startup/config")();

const PORT = process.env.PORT || 3001;
const URI = process.env.DB_URL;

//connect to the database

connectDB(URI);

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

app.use((err, req, res, next) => {
    res.status(500).send('Could not perform the calculation!');
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req, res, next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

const server=app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occurred during connection", err);
    }
    else {
        console.log("Connection established successfully at:", PORT);
    }
})
module.exports = server;