
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const moviesRoute = require("../routes/moviesRoute");
const customerRoute = require("../routes/customerRoute");
const genreRoute = require("../routes/genreRoute");
const rentalRoute = require("../routes/rentalRoute");
const userRoute = require("../routes/UserRoute");
const authRoute = require("../routes/authRoute");


module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use("/movies", moviesRoute);
    app.use("/customer", customerRoute);
    app.use("/genre", genreRoute);
    app.use("/rental", rentalRoute);
    app.use("/user", userRoute);
    app.use("/auth", authRoute);
};

// app.use(bodyParser.urlencoded({ extended: true }));