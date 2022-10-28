const { createLogger, format, transports } = require('winston');
const winston = require("winston");
require("express-async-errors");
const express= require("express");
const app = express();

module.exports = function (app) {
    const logger = createLogger({
        format: format.combine(
            format.json(),
            format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        ),
        transports: [new transports.Console(),
        new transports.File({
            filename: 'logs/server.log',
        }),
        ]
    });

    new winston.ExceptionHandler(
        new winston.transports.File({ filename: "uncaughtException.log" })
    );

    process.on("unhandledRejection", (ex) => {
        throw (ex);
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
};
